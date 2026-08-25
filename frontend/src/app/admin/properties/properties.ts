import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  AdminPropertyService,
  PropertyResponse
} from '../../core/services/admin-property.service';


@Component({
  selector: 'app-admin-properties',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './properties.html',

  styleUrl: './properties.css'
})
export class Properties implements OnInit {

  private readonly service =
    inject(AdminPropertyService);


  properties: PropertyResponse[] = [];

  loading = true;

  errorMessage = '';


  ngOnInit(): void {

    this.loadProperties();
  }


  loadProperties(): void {

    this.loading = true;

    this.errorMessage = '';


    this.service
      .findAll()
      .subscribe({

        next: properties => {

          this.properties =
            properties;

          this.loading = false;
        },


        error: error => {

          console.error(
            'Erreur propriétés ADMIN',
            error
          );

          this.errorMessage =
            'Impossible de charger les propriétés.';

          this.loading = false;
        }

      });
  }


  changeStatus(
    property: PropertyResponse,
    statut: string
  ): void {

    if (
      property.statut === statut
    ) {
      return;
    }


    this.service
      .updateStatus(
        property.id,
        statut
      )
      .subscribe({

        next: updated => {

          this.replaceProperty(
            updated
          );
        },


        error: error => {

          console.error(
            'Erreur changement statut',
            error
          );

          this.errorMessage =
            'Impossible de modifier le statut.';
        }

      });
  }


  toggleFeatured(
    property: PropertyResponse
  ): void {

    this.service
      .toggleFeatured(
        property.id
      )
      .subscribe({

        next: updated => {

          this.replaceProperty(
            updated
          );
        },


        error: error => {

          console.error(
            'Erreur featured',
            error
          );

          this.errorMessage =
            'Impossible de modifier la mise en avant.';
        }

      });
  }


  private replaceProperty(
    updated: PropertyResponse
  ): void {

    this.properties =
      this.properties.map(
        property =>
          property.id === updated.id
            ? updated
            : property
      );
  }


  formatPrice(
    property: PropertyResponse
  ): string {

    if (
      property.prix == null
    ) {

      return 'Prix sur demande';
    }


    return new Intl.NumberFormat(
      'fr-FR',
      {
        style: 'currency',
        currency:
          property.devise || 'USD',

        maximumFractionDigits: 0
      }
    ).format(
      property.prix
    );
  }


  getLocation(
    property: PropertyResponse
  ): string {

    const parts = [

      property.quartier,

      property.ville,

      property.departement

    ].filter(Boolean);


    return parts.length
      ? parts.join(', ')
      : 'Localisation non renseignée';
  }
  imageUrl(
    property: PropertyResponse
  ): string {

    return this.service.getImageUrl(
      property.mainImageUrl
    );
  }
}
