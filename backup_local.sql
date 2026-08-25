-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: immobilier_jacmel
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `client_id` bigint DEFAULT NULL,
  `agent_id` bigint DEFAULT NULL,
  `nom_contact` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sujet` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime DEFAULT NULL,
  `lieu` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT 'DEMANDE',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_appointment_client` (`client_id`),
  KEY `idx_appointment_date` (`date_debut`),
  KEY `idx_appointment_status` (`statut`),
  KEY `idx_appointment_agent` (`agent_id`),
  CONSTRAINT `fk_appointment_agent` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_appointment_client` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,NULL,6,'Jean Pierre','jean@example.com','+509 3700 0000','Consultation immobilière','2026-08-20 14:00:00','2026-08-20 15:00:00','Bureau NovaImmo - Jacmel','DEMANDE','Première consultation.','2026-08-15 20:53:21'),(2,NULL,5,'Louis Jean Marie Trompe','trompelouisjeanmarie@gmail.com','14387780507','Consultation immobilière','2026-08-17 16:59:00','2026-08-17 19:59:00','Bureau NovaImmo - Jacmel','TERMINE','discuter de mon projet avec le staff','2026-08-15 21:00:43'),(3,3,5,'Jodeph Client','client@novaimmo.ht','14387780507','Consultation immobilière','2026-08-22 02:29:00','2026-08-22 02:31:00','Bureau NovaImmo - Jacmel','TERMINE','prise de contact ','2026-08-16 06:30:02');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sujet` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `statut` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT 'NOUVEAU',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entreprise` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type_partenaire` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actif` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint NOT NULL,
  `reference` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `montant` decimal(15,2) NOT NULL,
  `devise` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'USD',
  `mode_paiement` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT 'EN_ATTENTE',
  `date_paiement` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_payment_transaction` (`transaction_id`),
  KEY `idx_payment_status` (`statut`),
  CONSTRAINT `fk_payment_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'PAY-TEST-001',500.00,'USD','VIREMENT','PAYE','2026-08-16 08:03:58','2026-08-16 12:03:58');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `reference` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `localisation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `budget` decimal(15,2) DEFAULT NULL,
  `devise` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'USD',
  `statut` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT 'ETUDE',
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_id` bigint NOT NULL,
  `agent_id` bigint DEFAULT NULL,
  `titre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `transaction_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prix` decimal(38,2) DEFAULT NULL,
  `devise` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quartier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `departement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pays` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(38,2) DEFAULT NULL,
  `longitude` decimal(38,2) DEFAULT NULL,
  `chambres` int DEFAULT '0',
  `salles_bain` int DEFAULT '0',
  `superficie` decimal(38,2) DEFAULT NULL,
  `statut` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  KEY `fk_property_type` (`type_id`),
  KEY `fk_property_agent` (`agent_id`),
  CONSTRAINT `fk_property_agent` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_property_type` FOREIGN KEY (`type_id`) REFERENCES `property_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (7,'PROP-001',2,NULL,'Villa contemporaine avec piscine','Villa moderne située à Cyvadier, Jacmel.','VENTE',625000.00,'USD','Cyvadier','Cyvadier','Jacmel','Sud-Est','Haïti',18.24,-72.51,4,3,320.00,'DISPONIBLE',0,'2026-08-15 14:26:40','2026-08-24 08:12:38'),(8,'PROP-002',3,NULL,'Résidence moderne avec terrasse','Appartement moderne situé au centre-ville de Jacmel.','LOCATION',2800.00,'USD','Centre-ville','Centre-ville','Jacmel','Sud-Est','Haïti',18.23,-72.54,3,2,180.00,'INACTIVE',1,'2026-08-15 14:26:40','2026-08-24 08:08:29'),(9,'PROP-003',4,NULL,'Terrain pour développement immobilier','Terrain destiné à un projet résidentiel ou touristique.','INVESTISSEMENT',450000.00,'USD','Route de Marigot','Route de Marigot','Jacmel','Sud-Est','Haïti',18.23,-72.50,0,0,5400.00,'DISPONIBLE',1,'2026-08-15 14:26:40','2026-08-23 15:54:58'),(10,'PROP-004',1,NULL,'Maison familiale avec jardin','Maison familiale située dans un quartier résidentiel calme de Jacmel.','VENTE',285000.00,'USD','Meyer','Meyer','Jacmel','Sud-Est','Haïti',18.24,-72.53,3,2,210.00,'DISPONIBLE',1,'2026-08-18 05:09:20','2026-08-23 15:54:53'),(11,'PROP-005',1,NULL,'Face a la mer','Residence tres calme, convenable pour accueil des ateliers d\'ecriture','LOCATION',3500.00,'USD','Cap Lamandoue','Lamandoue','Jacmel','Sud-Est','Haïti',0.00,0.00,7,3,350.00,'DISPONIBLE',1,'2026-08-21 19:03:25','2026-08-23 15:55:01');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `property_id` bigint NOT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titre` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `principale` tinyint(1) DEFAULT '0',
  `ordre_affichage` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_image_property` (`property_id`),
  CONSTRAINT `fk_image_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_images`
--

LOCK TABLES `property_images` WRITE;
/*!40000 ALTER TABLE `property_images` DISABLE KEYS */;
INSERT INTO `property_images` VALUES (5,7,'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85','Vue principale de la villa',1,1,'2026-08-15 15:57:31'),(6,7,'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85','Espace intérieur',0,2,'2026-08-15 15:57:31'),(7,8,'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85','Résidence moderne',1,1,'2026-08-15 15:57:31'),(8,9,'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85','Terrain à Jacmel',1,1,'2026-08-15 15:57:31'),(9,10,'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=85','Maison familiale à Jacmel',1,1,'2026-08-18 05:11:16'),(10,10,'/uploads/properties/10/3212283a-2da2-491f-9ba0-34705d306676.jpg','Vue principale',0,1,'2026-08-19 07:37:36'),(12,11,'/uploads/properties/11/fdcb1d2d-4c52-41bc-912d-ba2b6e40c37f.jpg','VUE_SUR_MER.jpg',1,1,'2026-08-21 19:05:08');
/*!40000 ALTER TABLE `property_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_types`
--

DROP TABLE IF EXISTS `property_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_types`
--

LOCK TABLES `property_types` WRITE;
/*!40000 ALTER TABLE `property_types` DISABLE KEYS */;
INSERT INTO `property_types` VALUES (1,'HOUSE','Maison'),(2,'VILLA','Villa'),(3,'APARTMENT','Appartement'),(4,'LAND','Terrain'),(5,'COMMERCIAL','Local commercial');
/*!40000 ALTER TABLE `property_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_visits`
--

DROP TABLE IF EXISTS `property_visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_visits` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `property_id` bigint NOT NULL,
  `client_id` bigint DEFAULT NULL,
  `agent_id` bigint DEFAULT NULL,
  `nom_visiteur` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_visite` datetime NOT NULL,
  `nombre_personnes` int DEFAULT '1',
  `statut` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT 'DEMANDEE',
  `commentaire` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_visit_client` (`client_id`),
  KEY `idx_visit_property` (`property_id`),
  KEY `idx_visit_date` (`date_visite`),
  KEY `idx_visit_status` (`statut`),
  KEY `idx_visit_agent` (`agent_id`),
  CONSTRAINT `fk_visit_agent` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_visit_client` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_visit_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_visits`
--

LOCK TABLES `property_visits` WRITE;
/*!40000 ALTER TABLE `property_visits` DISABLE KEYS */;
INSERT INTO `property_visits` VALUES (1,8,NULL,6,'Louis Jean Marie Trompe','trompelouisjeanmarie@gmail.com','14387780507','2026-08-28 17:11:00',2,'EFFECTUEE','Discuter de la location de l\'appartement','2026-08-15 21:11:49'),(2,7,3,5,'Joseph Client','client@novaimmo.ht','+50944231166','2026-08-26 03:08:00',1,'EFFECTUEE','visite d\'affaires','2026-08-16 07:09:24'),(3,8,3,6,'Joseph Marc','client@novaimmo.ht','+509 3700 0003','2026-08-30 14:00:00',1,'CONFIRMEE','Test visite client connecté','2026-08-16 15:04:08'),(4,7,8,5,'Balendio Mbema','balendio@novaimmo.ht','78906543','2026-08-20 21:34:00',1,'CONFIRMEE','Urgent!','2026-08-17 01:35:05'),(5,8,9,5,'Joseph Francky','francky@novaimmo.ht','78659087','2026-08-19 17:48:00',1,'CONFIRMEE','Louer l appartement','2026-08-17 21:49:30'),(6,9,11,6,'La Rosa Rosa','rosa@novaimmo.ht','56789032','2026-08-31 12:15:00',1,'DEMANDEE','','2026-08-19 10:15:31');
/*!40000 ALTER TABLE `property_visits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN','Administrateur'),(2,'AGENT','Agent immobilier'),(3,'CLIENT','Client'),(4,'PARTNER','Partenaire');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_documents`
--

DROP TABLE IF EXISTS `transaction_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_documents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint NOT NULL,
  `type_document` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom_fichier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fichier_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_transaction_document_transaction` (`transaction_id`),
  CONSTRAINT `fk_document_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_documents`
--

LOCK TABLES `transaction_documents` WRITE;
/*!40000 ALTER TABLE `transaction_documents` DISABLE KEYS */;
INSERT INTO `transaction_documents` VALUES (1,1,'CONTRAT','contrat-location-prop-002.pdf','https://example.com/documents/contrat-location-prop-002.pdf','2026-08-16 11:46:17');
/*!40000 ALTER TABLE `transaction_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `reference` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `property_id` bigint NOT NULL,
  `client_id` bigint DEFAULT NULL,
  `agent_id` bigint DEFAULT NULL,
  `type_transaction` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `montant` decimal(15,2) NOT NULL,
  `devise` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'USD',
  `statut` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT 'EN_NEGOCIATION',
  `date_transaction` datetime DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  KEY `fk_transaction_property` (`property_id`),
  KEY `fk_transaction_client` (`client_id`),
  KEY `fk_transaction_agent` (`agent_id`),
  CONSTRAINT `fk_transaction_agent` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_transaction_client` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_transaction_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'TRX-TEST-001',8,3,5,'LOCATION',1800.00,'USD','TERMINEE','2026-08-16 07:45:29','Transaction de test pour le dashboard client','2026-08-16 11:45:29','2026-08-17 05:42:39');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_id` bigint NOT NULL,
  `nom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actif` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_user_role` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'Administrateur','NovaImmo','admin@novaimmo.ht','$2a$10$Uq5sxZkp1.E77XShWnkD4.qEtUm8CDhPSkuq881q6wvUk/SMvqeay','+509 3700 0001',1,'2026-08-15 18:12:12','2026-08-15 18:12:12'),(2,2,'Pierre','Jean','agent@novaimmo.ht','$2a$10$Uq5sxZkp1.E77XShWnkD4.qEtUm8CDhPSkuq881q6wvUk/SMvqeay','+509 3700 0002',1,'2026-08-15 18:12:12','2026-08-15 18:12:12'),(3,3,'Joseph','Marc','client@novaimmo.ht','$2a$10$Uq5sxZkp1.E77XShWnkD4.qEtUm8CDhPSkuq881q6wvUk/SMvqeay','+509 3700 0003',1,'2026-08-15 18:12:12','2026-08-15 18:12:12'),(4,3,'Loulou','Tchenn','loulou@novaimmo.ht','$2a$10$caTTu5dQCZGFPHLeXufekujrMBOzRST/F2Ih70RWsN2ja8zJ5TtZ6','44231166',1,'2026-08-16 16:23:56','2026-08-16 18:02:38'),(5,2,'Etienne','Samuel','samuel.agent@novaimmo.ht','$2a$10$.yQSLM7bsuB3HKYMfICLjeZKAR2f2Qgu8b55qu0b8z434mx6Ve5ya','+509 3700 0010',1,'2026-08-16 17:53:54','2026-08-16 17:53:54'),(6,2,'Cyprien','Moise','moise@novaimmo.ht','$2a$10$ZLC24VZGhK4bgR2fdkqEmuOIQJ8Qm5ymqYM2RebO4H1M6m1EgMQFC','34567878',1,'2026-08-16 18:03:38','2026-08-22 00:33:22'),(7,3,'Francois','Ruth','ruth@novaimmo.ht','$2a$10$5F1PIcGUSTgDp9IFtuM8VOaT4aR1LAI0wKdL97oQHsCFMp9Bnzhj.','56437833',1,'2026-08-17 00:48:15','2026-08-17 22:36:00'),(8,3,'Balendio','MBema','balendio@novaimmo.ht','$2a$10$uoP1e6waVSY3DJ.VUlGm3OWWTeP52tN9aoZyifyvrM2KzR1dfC9gW','67564320',1,'2026-08-17 01:31:39','2026-08-22 00:34:47'),(9,3,'Joseph','Francky','francky@novaimmo.ht','$2a$10$1JDMJfLi7rcR0nvZkxGLI.RR35czstVepmEDOlGSvvbn2FS9oW/LS','76890987',1,'2026-08-17 21:46:18','2026-08-17 21:46:18'),(10,3,'Marcelin','Mackenley','marcelin@novaimmo.com','$2a$10$e0nX7epfj0ssR745SGI1Ju5k59Yz46JK9SgniqnSQM1o/Qq/mzIb6','56437890',1,'2026-08-17 22:26:21','2026-08-17 22:29:25'),(11,3,'la Rosa','Rosa','rosa@novaimmo.ht','$2a$10$JJey99ZXgz17.YIdVOPYc.Og8grS2Q1Jeq3OkW4mst.F93DyEdi2y','56789032',1,'2026-08-19 10:11:59','2026-08-19 10:11:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-25  9:04:38
