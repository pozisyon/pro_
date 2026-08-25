import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  Property
} from '../../core/models/property';

import {
  PropertyService
} from '../../core/services/property.service';


@Component({
  selector: 'app-home',

  imports: [
    RouterLink
  ],

  templateUrl: './home.html',

  styleUrl: './home.css'
})
export class Home implements OnInit {

  private readonly propertyService =
    inject(PropertyService);


  properties: Property[] = [];

  loading = true;

  errorMessage = '';


  ngOnInit(): void {

    this.loadFeaturedProperties();
  }


  loadFeaturedProperties(): void {

    this.loading = true;

    this.errorMessage = '';


    this.propertyService
      .findFeatured()
      .subscribe({

        next: properties => {

          this.properties =
            properties;

          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur lors du chargement des propriétés :',
            error
          );

          this.errorMessage =
            'Impossible de charger les propriétés pour le moment.';

          this.loading =
            false;
        }

      });
  }


  getPropertyImage(
    property: Property
  ): string {

    /*
     * 1. Image principale provenant
     * directement du backend.
     */
    if (property.mainImageUrl) {

      return property.mainImageUrl;
    }


    /*
     * 2. Si aucune image principale
     * n'est définie, prendre la première
     * image disponible.
     */
    if (
      property.images &&
      property.images.length > 0
    ) {

      return property.images[0].imageUrl;
    }


    /*
     * 3. Image de secours.
     */
    return '/assets/images/property-placeholder.jpg';
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


  getTransactionLabel(
    transactionType: string
  ): string {

    switch (
      transactionType
        ?.toUpperCase()
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
  imageUrl(
    property: any
  ): string {

    const url =
      property.mainImageUrl;

    if (!url) {
      return '';
    }

    if (
      url.startsWith('http://')
      ||
      url.startsWith('https://')
    ) {
      return url;
    }

    return `http://localhost:8080${url}`;
  }
}
