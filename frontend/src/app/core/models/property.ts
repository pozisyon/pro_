export interface PropertyType {
  id: number;
  code: string;
  nom: string;
}export interface PropertyImage {

  id: number;

  propertyId: number;

  imageUrl: string;

  titre: string | null;

  principale: boolean;

  ordreAffichage: number;
}


export interface Property {

  id: number;

  reference: string;

  typeId: number;

  typeCode: string;

  typeNom: string;

  titre: string;

  description: string;

  transactionType: string;

  prix: number;

  devise: string;

  adresse?: string | null;

  quartier?: string | null;

  ville: string;

  departement: string;

  pays: string;

  latitude?: number | null;

  longitude?: number | null;

  chambres: number;

  sallesBain: number;

  superficie: number;

  statut: string;

  featured: boolean;

  mainImageUrl: string | null;

  images: PropertyImage[];

  createdAt?: string;

  updatedAt?: string;
}
