import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  Property
} from '../../core/models/property';

import {
  PropertyService
} from '../../core/services/property.service';


@Component({
  selector: 'app-property-detail',

  imports: [
    RouterLink
  ],

  templateUrl: './property-detail.html',

  styleUrl: './property-detail.css'
})
export class PropertyDetail implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly propertyService =
    inject(PropertyService);


  property: Property | null = null;

  loading = true;

  errorMessage = '';

  selectedImage = '';


  ngOnInit(): void {

    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );


    if (!id || Number.isNaN(id)) {

      this.errorMessage =
        'Identifiant de propriété invalide.';

      this.loading = false;

      return;
    }


    this.loadProperty(id);
  }


  loadProperty(
    id: number
  ): void {

    this.loading = true;

    this.errorMessage = '';


    this.propertyService
      .findById(id)
      .subscribe({

        next: property => {

          this.property =
            property;

          this.selectedImage =
            this.getMainImage(property);

          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement propriété :',
            error
          );

          this.errorMessage =
            'Impossible de charger cette propriété.';

          this.loading =
            false;
        }

      });
  }


  selectImage(
    imageUrl: string
  ): void {

    this.selectedImage =
      imageUrl;
  }


  getMainImage(
    property: Property
  ): string {

    if (property.mainImageUrl) {

      return property.mainImageUrl;
    }


    if (
      property.images &&
      property.images.length > 0
    ) {

      return property.images[0].imageUrl;
    }


    return '/assets/images/property-placeholder.jpg';
  }


  getTransactionLabel(
    transactionType: string
  ): string {

    switch (
      transactionType?.toUpperCase()
      ) {

      case 'VENTE':
        return 'À vendre';

      case 'LOCATION':
        return 'À louer';

      case 'INVESTISSEMENT':
        return 'Investissement';

      default:
        return transactionType;
    }
  }


  formatPrice(
    price: number,
    currency: string
  ): string {

    return new Intl.NumberFormat(
      'fr-FR',
      {
        style: 'currency',

        currency:
          currency || 'USD'
      }
    ).format(price);
  }
}
