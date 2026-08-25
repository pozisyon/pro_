import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import {
  AdminPropertyService,
  CreatePropertyRequest,
  UpdatePropertyRequest
} from '../../core/services/admin-property.service';

@Component({
  selector: 'app-admin-property-form',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './property-form.html',

  styleUrl: './property-form.css'
})
export class PropertyForm {

  private readonly fb =
    inject(FormBuilder);

  private readonly service =
    inject(AdminPropertyService);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);


  editMode = false;

  propertyId: number | null = null;

  submitting = false;

  errorMessage = '';


  propertyTypes = [

    {
      id: 1,
      code: 'HOUSE',
      nom: 'Maison'
    },

    {
      id: 2,
      code: 'VILLA',
      nom: 'Villa'
    },

    {
      id: 3,
      code: 'APARTMENT',
      nom: 'Appartement'
    },

    {
      id: 4,
      code: 'LAND',
      nom: 'Terrain'
    },

    {
      id: 5,
      code: 'COMMERCIAL',
      nom: 'Local commercial'
    }

  ];


  form =
    this.fb.nonNullable.group({

      reference: [
        '',
        Validators.required
      ],

      typeId: [
        1,
        Validators.required
      ],

      titre: [
        '',
        Validators.required
      ],

      description: [
        ''
      ],

      transactionType: [
        'VENTE',
        Validators.required
      ],

      prix: [
        0
      ],

      devise: [
        'USD'
      ],

      adresse: [
        ''
      ],

      quartier: [
        ''
      ],

      ville: [
        'Jacmel'
      ],

      departement: [
        'Sud-Est'
      ],

      pays: [
        'Haïti'
      ],

      latitude: [
        0
      ],

      longitude: [
        0
      ],

      chambres: [
        0
      ],

      sallesBain: [
        0
      ],

      superficie: [
        0
      ],

      statut: [
        'DISPONIBLE'
      ],

      featured: [
        false
      ]

    });


  constructor() {

    const id =
      this.route.snapshot.paramMap.get(
        'id'
      );

    if (id) {

      this.editMode = true;

      this.propertyId =
        Number(id);

      this.loadProperty();

    }

  }


  private loadProperty(): void {

    if (!this.propertyId) {

      return;

    }

    this.service
      .findById(
        this.propertyId
      )
      .subscribe({

        next: property => {

          this.form.patchValue({

            reference:
            property.reference,

            typeId:
            property.typeId,

            titre:
            property.titre,

            description:
              property.description ?? '',

            transactionType:
              property.transactionType ?? 'VENTE',

            prix:
              property.prix ?? 0,

            devise:
              property.devise ?? 'USD',

            adresse:
              property.adresse ?? '',

            quartier:
              property.quartier ?? '',

            ville:
              property.ville ?? '',

            departement:
              property.departement ?? '',

            pays:
              property.pays ?? '',

            latitude:
              property.latitude ?? 0,

            longitude:
              property.longitude ?? 0,

            chambres:
              property.chambres ?? 0,

            sallesBain:
              property.sallesBain ?? 0,

            superficie:
              property.superficie ?? 0,

            statut:
            property.statut,

            featured:
            property.featured

          });

        },

        error: () => {

          this.errorMessage =
            'Impossible de charger cette propriété.';

        }

      });

  }
  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.submitting = true;

    this.errorMessage = '';

    const raw =
      this.form.getRawValue();


    const createRequest: CreatePropertyRequest = {

      reference:
        raw.reference.trim(),

      typeId:
        Number(raw.typeId),

      titre:
        raw.titre.trim(),

      description:
        raw.description.trim(),

      transactionType:
      raw.transactionType,

      prix:
        Number(raw.prix),

      devise:
      raw.devise,

      adresse:
        raw.adresse.trim(),

      quartier:
        raw.quartier.trim(),

      ville:
        raw.ville.trim(),

      departement:
        raw.departement.trim(),

      pays:
        raw.pays.trim(),

      latitude:
        Number(raw.latitude),

      longitude:
        Number(raw.longitude),

      chambres:
        Number(raw.chambres),

      sallesBain:
        Number(raw.sallesBain),

      superficie:
        Number(raw.superficie),

      statut:
      raw.statut,

      featured:
      raw.featured

    };


    const updateRequest: UpdatePropertyRequest = {

      typeId:
        Number(raw.typeId),

      titre:
        raw.titre.trim(),

      description:
        raw.description.trim(),

      transactionType:
      raw.transactionType,

      prix:
        Number(raw.prix),

      devise:
      raw.devise,

      adresse:
        raw.adresse.trim(),

      quartier:
        raw.quartier.trim(),

      ville:
        raw.ville.trim(),

      departement:
        raw.departement.trim(),

      pays:
        raw.pays.trim(),

      latitude:
        Number(raw.latitude),

      longitude:
        Number(raw.longitude),

      chambres:
        Number(raw.chambres),

      sallesBain:
        Number(raw.sallesBain),

      superficie:
        Number(raw.superficie),

      statut:
      raw.statut,

      featured:
      raw.featured

    };


    const operation =

      this.editMode

        ? this.service.update(
          this.propertyId!,
          updateRequest
        )

        : this.service.create(
          createRequest
        );


    operation.subscribe({

      next: () => {

        this.submitting = false;

        this.router.navigate([
          '/admin/properties'
        ]);

      },

      error: error => {

        console.error(error);

        this.submitting = false;

        this.errorMessage =
          error?.error?.message
          ||
          (
            this.editMode
              ? 'Impossible de modifier la propriété.'
              : 'Impossible de créer la propriété.'
          );

      }

    });

  }


  get pageTitle(): string {

    return this.editMode

      ? 'Modifier une propriété'

      : 'Ajouter une propriété';

  }


  get submitLabel(): string {

    return this.editMode

      ? 'Mettre à jour'

      : 'Enregistrer';

  }

}

