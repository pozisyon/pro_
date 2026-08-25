import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Property
} from '../../core/models/property';

import {
  PropertyService
} from '../../core/services/property.service';

import {
  VisitService
} from '../../core/services/visit.service';


@Component({
  selector: 'app-property-visit',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './property-visit.html',

  styleUrl: './property-visit.css'
})
export class PropertyVisit implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly fb =
    inject(FormBuilder);

  private readonly propertyService =
    inject(PropertyService);

  private readonly visitService =
    inject(VisitService);


  property: Property | null = null;

  propertyId = 0;

  loadingProperty = true;

  submitting = false;

  successMessage = '';

  errorMessage = '';


  visitForm = this.fb.nonNullable.group({

    nomVisiteur: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    telephone: [
      '',
      [
        Validators.required
      ]
    ],

    dateVisite: [
      '',
      [
        Validators.required
      ]
    ],

    nombrePersonnes: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    commentaire: ['']

  });


  ngOnInit(): void {

    this.propertyId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );


    if (
      !this.propertyId ||
      Number.isNaN(this.propertyId)
    ) {

      this.errorMessage =
        'Propriété invalide.';

      this.loadingProperty =
        false;

      return;
    }


    this.loadProperty();
  }


  loadProperty(): void {

    this.propertyService
      .findById(this.propertyId)
      .subscribe({

        next: property => {

          this.property =
            property;

          this.loadingProperty =
            false;
        },


        error: error => {

          console.error(error);

          this.errorMessage =
            'Impossible de charger cette propriété.';

          this.loadingProperty =
            false;
        }

      });
  }


  submit(): void {

    if (this.visitForm.invalid) {

      this.visitForm.markAllAsTouched();

      return;
    }


    this.submitting = true;

    this.errorMessage = '';

    this.successMessage = '';


    const formValue =
      this.visitForm.getRawValue();


    /*
     * input type="datetime-local"
     * fournit une chaîne compatible avec
     * LocalDateTime côté Spring.
     */
    const request = {

      nomVisiteur:
      formValue.nomVisiteur,

      email:
      formValue.email,

      telephone:
      formValue.telephone,

      dateVisite:
      formValue.dateVisite,

      nombrePersonnes:
      formValue.nombrePersonnes,

      commentaire:
      formValue.commentaire

    };


    this.visitService
      .create(
        this.propertyId,
        request
      )
      .subscribe({

        next: visit => {

          this.submitting =
            false;

          this.successMessage =
            `Votre demande de visite a été enregistrée. Référence : ${visit.id}`;

          this.visitForm.reset({
            nomVisiteur: '',
            email: '',
            telephone: '',
            dateVisite: '',
            nombrePersonnes: 1,
            commentaire: ''
          });
        },


        error: error => {

          console.error(
            'Erreur demande visite',
            error
          );

          this.submitting =
            false;

          this.errorMessage =
            error?.error?.message
            || 'Impossible d’enregistrer la demande de visite.';
        }

      });
  }


  getPropertyImage(): string {

    if (!this.property) {

      return '/assets/images/property-placeholder.jpg';
    }


    if (this.property.mainImageUrl) {

      return this.property.mainImageUrl;
    }


    if (
      this.property.images &&
      this.property.images.length > 0
    ) {

      return this.property.images[0].imageUrl;
    }


    return '/assets/images/property-placeholder.jpg';
  }
}
