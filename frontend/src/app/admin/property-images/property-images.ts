import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  AdminPropertyService,
  PropertyImageResponse,
  PropertyResponse
} from '../../core/services/admin-property.service';


@Component({
  selector: 'app-property-images',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './property-images.html',

  styleUrl: './property-images.css'
})
export class PropertyImages implements OnInit {

  private readonly service =
    inject(AdminPropertyService);

  private readonly route =
    inject(ActivatedRoute);


  propertyId = 0;

  property: PropertyResponse | null =
    null;

  images: PropertyImageResponse[] = [];


  selectedFile: File | null =
    null;

  previewUrl: string | null =
    null;


  titre = '';

  principale = false;

  ordreAffichage = 1;


  loading = true;

  uploading = false;

  errorMessage = '';

  successMessage = '';


  ngOnInit(): void {

    this.propertyId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );


    if (!this.propertyId) {

      this.errorMessage =
        'Identifiant de propriété invalide.';

      this.loading =
        false;

      return;
    }


    this.loadProperty();

    this.loadImages();
  }


  loadProperty(): void {

    this.service
      .findById(
        this.propertyId
      )
      .subscribe({

        next: property => {

          this.property =
            property;
        },


        error: error => {

          console.error(
            'Erreur chargement propriété',
            error
          );

          this.errorMessage =
            'Impossible de charger les informations de la propriété.';
        }

      });
  }


  loadImages(): void {

    this.loading = true;

    this.errorMessage = '';


    this.service
      .getImages(
        this.propertyId
      )
      .subscribe({

        next: images => {

          this.images =
            images;

          this.ordreAffichage =
            images.length + 1;

          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement images',
            error
          );

          this.errorMessage =
            'Impossible de charger les images.';

          this.loading =
            false;
        }

      });
  }


  onFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files
      ||
      input.files.length === 0
    ) {

      return;
    }


    this.selectedFile =
      input.files[0];


    if (
      this.previewUrl
    ) {

      URL.revokeObjectURL(
        this.previewUrl
      );
    }


    this.previewUrl =
      URL.createObjectURL(
        this.selectedFile
      );


    if (
      !this.titre
    ) {

      this.titre =
        this.selectedFile.name;
    }
  }


  upload(): void {

    if (
      !this.selectedFile
    ) {

      this.errorMessage =
        'Veuillez choisir une image.';

      return;
    }


    this.uploading =
      true;

    this.errorMessage =
      '';

    this.successMessage =
      '';


    this.service
      .uploadImage(

        this.propertyId,

        this.selectedFile,

        this.titre.trim(),

        this.principale,

        this.ordreAffichage

      )
      .subscribe({

        next: () => {

          this.uploading =
            false;

          this.successMessage =
            'Image ajoutée avec succès.';

          this.resetForm();

          this.loadImages();

          this.loadProperty();
        },


        error: error => {

          console.error(
            'Erreur upload image',
            error
          );

          this.uploading =
            false;

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible d’envoyer l’image.';
        }

      });
  }


  setMain(
    image: PropertyImageResponse
  ): void {

    if (
      image.principale
    ) {

      return;
    }


    this.errorMessage =
      '';

    this.successMessage =
      '';


    this.service
      .setMainImage(

        this.propertyId,

        image.id

      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Image principale modifiée avec succès.';

          this.loadImages();

          this.loadProperty();
        },


        error: error => {

          console.error(
            'Erreur image principale',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible de modifier l’image principale.';
        }

      });
  }


  remove(
    image: PropertyImageResponse
  ): void {

    const confirmed =
      window.confirm(
        `Supprimer l'image "${image.titre || 'Sans titre'}" ?`
      );


    if (
      !confirmed
    ) {

      return;
    }


    this.errorMessage =
      '';

    this.successMessage =
      '';


    this.service
      .deleteImage(

        this.propertyId,

        image.id

      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Image supprimée avec succès.';

          this.loadImages();

          this.loadProperty();
        },


        error: error => {

          console.error(
            'Erreur suppression image',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible de supprimer l’image.';
        }

      });
  }


  imageUrl(
    image: PropertyImageResponse
  ): string {

    return this.service
      .getImageUrl(
        image.imageUrl
      );
  }


  private resetForm(): void {

    this.selectedFile =
      null;

    this.titre =
      '';

    this.principale =
      false;

    this.ordreAffichage =
      this.images.length + 1;


    if (
      this.previewUrl
    ) {

      URL.revokeObjectURL(
        this.previewUrl
      );
    }


    this.previewUrl =
      null;
  }
  propertyMainImageUrl(): string {

    return this.service.getImageUrl(
      this.property?.mainImageUrl
      ?? null
    );
  }
}
