import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';
import {environment} from "../../../environments/environment";


/* =========================================================
   IMAGES
========================================================= */

export interface PropertyImageResponse {

  id: number;

  propertyId: number;

  imageUrl: string;

  titre: string | null;

  principale: boolean;

  ordreAffichage: number;
}


/* =========================================================
   PROPERTY RESPONSE
========================================================= */

export interface PropertyResponse {

  id: number;

  reference: string;

  typeId: number;

  typeCode: string;

  typeNom: string;

  titre: string;

  description: string | null;

  transactionType: string | null;

  prix: number | null;

  devise: string | null;

  adresse: string | null;

  quartier: string | null;

  ville: string | null;

  departement: string | null;

  pays: string | null;

  latitude: number | null;

  longitude: number | null;

  chambres: number | null;

  sallesBain: number | null;

  superficie: number | null;

  statut: string;

  featured: boolean;

  mainImageUrl: string | null;

  images: PropertyImageResponse[];

  createdAt: string;

  updatedAt: string;
}


/* =========================================================
   CREATION
========================================================= */
export interface CreatePropertyRequest {

  reference: string;

  typeId: number;

  titre: string;

  description: string | null;

  transactionType: string;

  prix: number;

  devise: string;

  adresse: string;

  quartier: string;

  ville: string;

  departement: string;

  pays: string;

  latitude: number | null;

  longitude: number | null;

  chambres: number;

  sallesBain: number;

  superficie: number;

  statut: string;

  featured: boolean;

}


export interface UpdatePropertyRequest {

  typeId: number;

  titre: string;

  description: string | null;

  transactionType: string;

  prix: number;

  devise: string;

  adresse: string;

  quartier: string;

  ville: string;

  departement: string;

  pays: string;

  latitude: number | null;

  longitude: number | null;

  chambres: number;

  sallesBain: number;

  superficie: number;

  statut: string;

  featured: boolean;

}


/* =========================================================
   MODIFICATION
========================================================= */
/*
export interface UpdatePropertyRequest {

  typeId: number | null;

  titre: string;

  description: string;

  transactionType: string;

  prix: number | null;

  devise: string;

  adresse: string;

  quartier: string;

  ville: string;

  departement: string;

  pays: string;

  latitude: number | null;

  longitude: number | null;

  chambres: number | null;

  sallesBain: number | null;

  superficie: number | null;

  statut: string;

  featured: boolean;
}
*/

/* =========================================================
   STATUT
========================================================= */

export interface UpdatePropertyStatusRequest {

  statut: string;
}


/* =========================================================
   SERVICE
========================================================= */

@Injectable({
  providedIn: 'root'
})
export class AdminPropertyService {

  private readonly http =
    inject(HttpClient);



  private readonly apiUrl = environment.apiUrl+"/admin/properties";


  /* =======================================================
     LISTE
  ======================================================= */

  findAll():
    Observable<PropertyResponse[]> {

    return this.http.get<PropertyResponse[]>(
      this.apiUrl
    );
  }


  /* =======================================================
     DETAIL
  ======================================================= */

  findById(
    id: number
  ): Observable<PropertyResponse> {

    return this.http.get<PropertyResponse>(
      `${this.apiUrl}/${id}`
    );
  }


  /* =======================================================
     CREATION
  ======================================================= */

  create(
    request: CreatePropertyRequest
  ): Observable<PropertyResponse> {

    return this.http.post<PropertyResponse>(
      this.apiUrl,
      request
    );

  }


  /* =======================================================
     MODIFICATION
  ======================================================= */
  update(
    id: number,
    request: UpdatePropertyRequest
  ): Observable<PropertyResponse> {

    return this.http.put<PropertyResponse>(
      `${this.apiUrl}/${id}`,
      request
    );

  }

  /* =======================================================
     CHANGEMENT DE STATUT
  ======================================================= */

  updateStatus(
    id: number,
    statut: string
  ): Observable<PropertyResponse> {

    const request:
      UpdatePropertyStatusRequest = {

      statut
    };


    return this.http.patch<PropertyResponse>(
      `${this.apiUrl}/${id}/status`,
      request
    );
  }


  /* =======================================================
     MISE EN VEDETTE
  ======================================================= */

  toggleFeatured(
    id: number
  ): Observable<PropertyResponse> {

    return this.http.patch<PropertyResponse>(
      `${this.apiUrl}/${id}/featured`,
      {}
    );
  }

  private readonly propertyApiUrl =
    'http://localhost:8080/api/properties';


  getImages(
    propertyId: number
  ): Observable<PropertyImageResponse[]> {

    return this.http.get<PropertyImageResponse[]>(
      `${this.propertyApiUrl}/${propertyId}/images`
    );
  }


  uploadImage(
    propertyId: number,
    file: File,
    titre: string,
    principale: boolean,
    ordreAffichage: number
  ): Observable<PropertyImageResponse> {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    formData.append(
      'titre',
      titre
    );

    formData.append(
      'principale',
      String(principale)
    );

    formData.append(
      'ordreAffichage',
      String(ordreAffichage)
    );


    return this.http.post<PropertyImageResponse>(
      `${this.propertyApiUrl}/${propertyId}/images/upload`,
      formData
    );
  }


  setMainImage(
    propertyId: number,
    imageId: number
  ): Observable<PropertyImageResponse> {

    return this.http.patch<PropertyImageResponse>(
      `${this.propertyApiUrl}/${propertyId}/images/${imageId}/principale`,
      {}
    );
  }


  deleteImage(
    propertyId: number,
    imageId: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.propertyApiUrl}/${propertyId}/images/${imageId}`
    );
  }

  getImageUrl(
    imageUrl: string | null
  ): string {

    if (!imageUrl) {
      return '';
    }

    if (
      imageUrl.startsWith('http://')
      ||
      imageUrl.startsWith('https://')
    ) {
      return imageUrl;
    }

    return `http://localhost:8080${imageUrl}`;
  }
  /*
  update(
    id: number,
    request: UpdatePropertyRequest
  ): Observable<PropertyResponse> {

    return this.http.put<PropertyResponse>(
      `${this.apiUrl}/${id}`,
      request
    );
  }
*/
}
