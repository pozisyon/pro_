import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

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
  selector: 'app-properties',

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: './properties.html',

  styleUrl: './properties.css'
})
export class Properties implements OnInit {

  private readonly propertyService =
    inject(PropertyService);


  properties: Property[] = [];

  filteredProperties: Property[] = [];

  loading = true;

  errorMessage = '';


  searchTerm = '';

  selectedType = '';

  selectedTransaction = '';

  selectedLocation = '';

  maxBudget: number | null = null;


  ngOnInit(): void {

    this.loadProperties();
  }


  loadProperties(): void {

    this.loading = true;

    this.propertyService
      .findAll()
      .subscribe({

        next: properties => {

          this.properties =
            properties;

          this.filteredProperties =
            properties;

          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement propriétés',
            error
          );

          this.errorMessage =
            'Impossible de charger les propriétés.';

          this.loading =
            false;
        }

      });
  }


  applyFilters(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    this.filteredProperties =
      this.properties.filter(
        property => {

          const matchSearch =
            !search
            ||
            property.titre
              .toLowerCase()
              .includes(search)
            ||
            property.description
              ?.toLowerCase()
              .includes(search)
            ||
            property.quartier
              ?.toLowerCase()
              .includes(search)
            ||
            property.ville
              ?.toLowerCase()
              .includes(search)
            ||
            property.reference
              ?.toLowerCase()
              .includes(search);


          const matchType =
            !this.selectedType
            ||
            property.typeCode ===
            this.selectedType;


          const matchTransaction =
            !this.selectedTransaction
            ||
            property.transactionType ===
            this.selectedTransaction;


          const matchLocation =
            !this.selectedLocation
            ||
            property.quartier ===
            this.selectedLocation;


          const matchBudget =
            this.maxBudget === null
            ||
            property.prix <=
            this.maxBudget;


          return (
            matchSearch
            &&
            matchType
            &&
            matchTransaction
            &&
            matchLocation
            &&
            matchBudget
          );
        }
      );
  }


  resetFilters(): void {

    this.searchTerm = '';

    this.selectedType = '';

    this.selectedTransaction = '';

    this.selectedLocation = '';

    this.maxBudget = null;

    this.filteredProperties =
      this.properties;
  }


  getPropertyImage(
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
    type: string
  ): string {

    switch (
      type?.toUpperCase()
      ) {

      case 'VENTE':
        return 'À vendre';

      case 'LOCATION':
        return 'À louer';

      case 'INVESTISSEMENT':
        return 'Investissement';

      default:
        return type;
    }
  }
}
