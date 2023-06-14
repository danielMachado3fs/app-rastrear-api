-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: app_scf
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

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
-- Table structure for table `checklist`
--

DROP TABLE IF EXISTS `checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeVehicle` enum('passeio','caminhonete','caminhao','carreta','van') NOT NULL,
  `options` longtext DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist`
--

LOCK TABLES `checklist` WRITE;
/*!40000 ALTER TABLE `checklist` DISABLE KEYS */;
/*!40000 ALTER TABLE `checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklist-vehicle`
--

DROP TABLE IF EXISTS `checklist-vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklist-vehicle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kmAtual` int(11) NOT NULL,
  `type` enum('entrada','saida') NOT NULL,
  `options` longtext DEFAULT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ecc3514abc910b0c0653e69822f` (`vehicleId`),
  CONSTRAINT `FK_ecc3514abc910b0c0653e69822f` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist-vehicle`
--

LOCK TABLES `checklist-vehicle` WRITE;
/*!40000 ALTER TABLE `checklist-vehicle` DISABLE KEYS */;
/*!40000 ALTER TABLE `checklist-vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `permissions` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','','2023-06-13 21:16:00.382206','2023-06-13 21:16:00.382206',NULL),(2,'Gerente','','2023-06-13 21:16:00.384625','2023-06-13 21:16:00.384625',NULL),(3,'Administrativo','','2023-06-13 21:16:00.384985','2023-06-13 21:16:00.384985',NULL),(4,'Financeiro','','2023-06-13 21:16:00.385622','2023-06-13 21:16:00.385622',NULL),(5,'Motorista','','2023-06-13 21:16:00.395142','2023-06-13 21:16:00.395142',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  `roleId` int(11) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `state` varchar(4) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `neighborhoods` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_368e146b785b574f42ae9e53d5e` (`roleId`),
  CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2023-06-13 21:16:00.510129','2023-06-13 21:16:00.510129',NULL,1,'Maria Santos','maria.santos@example.com','$2b$10$mJO2EtZI4wP3bMukKFc67OusIy6NQAxIwC.hlfpkLMp19nlJqtx/6','ativo',2,'Avenida B','87654-321','Rio ','Rio de Janeiro','Copacabana','456',NULL),('2023-06-13 21:16:00.511473','2023-06-13 21:16:00.511473',NULL,2,'Ana Ferreira','ana.ferreira@example.com','$2b$10$pJkt0103z2sjRlIJm6/Po.nBGYLs3AVS827IdQUM4fRbLtSIAPGCm','ativo',2,'Rua D','13579-246','Rio ','Porto Alegre','Moinhos de Vento','246',NULL),('2023-06-13 21:16:00.512042','2023-06-13 21:16:00.512042',NULL,3,'João Silva','joao.silva@example.com','$2b$10$AYDyxpx6hUpnSYpzKk1JZuJh36LHmBe358bGeXhYmjqGFdD5KDLPy','ativo',1,'Rua A','12345-678','São ','São Paulo','Centro','123','Apartmento 456'),('2023-06-13 21:16:00.512960','2023-06-13 21:16:00.512960',NULL,4,'José Pereira','jose.pereira@example.com','$2b$10$CLewYhdH0sO0lBBRelGnvOKztVu9wkLBM7fZY8rA5QkoCFkVjYJc2','inativo',1,'Rua C','54321-987','Mina','Belo Horizonte','Savassi','789',NULL),('2023-06-13 21:16:00.569776','2023-06-13 21:16:00.569776',NULL,5,'Pedro Gomes','pedro.gomes@example.com','$2b$10$z4W6TwhWF8uQwWfFBVA4wu8mEVMGDdeLl3eV2fAqt3r3h2ns/t9LO','inativo',1,'Avenida E','97531-864','Rio ','Pelotas','Centro','864',NULL),('2023-06-13 21:16:00.572491','2023-06-13 21:16:00.572491',NULL,6,'Rafael Silva','rafael.silva@example.com','$2b$10$dwWW9i0hFhkiVtgO4TPAsuen8assnRkKFRiH75qO5/38h8UfPHfaS','ativo',1,'Avenida K','97531-864','Pará','Belém','Nazaré','987',NULL),('2023-06-13 21:16:00.573089','2023-06-13 21:16:00.573089',NULL,7,'Larissa Lima','larissa.lima@example.com','$2b$10$JLS6uG2mhwDtuEdqWzbZH.KJK6V284n79vBveaXMC74jfMdr/8xQu','ativo',2,'Avenida N','87654-321','Pern','Recife','Boa Viagem','456',NULL),('2023-06-13 21:16:00.574050','2023-06-13 21:16:00.574050',NULL,8,'Mariana Costa','mariana.costa@example.com','$2b$10$7Nokc0XRBBpkOwoXr7.5rueYuZJLOlVe8AYGXSxPzPFv47lkfJWri','ativo',2,'Rua L','13579-864','Amaz','Manaus','Centro','246',NULL),('2023-06-13 21:16:00.630579','2023-06-13 21:16:00.630579',NULL,9,'Guilherme Santos','guilherme.santos@example.com','$2b$10$kEc5tmTaM9nEiTgMpkMVzeq6tbtQxmPnV8Wj46rgcx6LtWnAJwJFe','ativo',1,'Rua M','54321-678','Cear','Fortaleza','Aldeota','123',NULL),('2023-06-13 21:16:00.632384','2023-06-13 21:16:00.632384',NULL,10,'Lucas Santos','lucas.santos@example.com','$2b$10$3jvBTDhYDvDwoX1Hdc1lXeVMk0ZlTi6RDBQourfjq5qfFV0quOLSu','ativo',1,'Rua G','54321-678','Bahi','Salvador','Pituba','654',NULL),('2023-06-13 21:16:00.633739','2023-06-13 21:16:00.633739',NULL,11,'Rodrigo Oliveira','rodrigo.oliveira@example.com','$2b$10$Rs6ZuUYpb7OzSnHkDqyc/OeWxjiKeJYXWCJTRq80NuJI4wZXKha92','ativo',1,'Rua O','54321-987','Mato','Cuiabá','Centro','789','Sala 456'),('2023-06-13 21:16:00.636010','2023-06-13 21:16:00.636010',NULL,12,'Carla Oliveira','carla.oliveira@example.com','$2b$10$0r1LmfuDgP4Kwi5h0X7ineXyDg433DLJOx.oryvNt6f.zajCqwtTO','ativo',2,'Rua F','13579-864','São ','Ribeirão Preto','Jardim Paulista','987',NULL),('2023-06-13 21:16:00.688336','2023-06-13 21:16:00.688336',NULL,13,'Juliana Lima','juliana.lima@example.com','$2b$10$h4mN0/IywVMb7V8GKL0Tue47.ADvkR2Cir3NpD656thKBLztoM3sy','ativo',2,'Avenida H','87654-321','Goiá','Goiânia','Setor Bueno','987',NULL),('2023-06-13 21:16:00.688903','2023-06-13 21:16:00.688903',NULL,14,'Fernando Souza','fernando.souza@example.com','$2b$10$686enaErOLYnvJ.vqz/aN.lU9PmnmTrWRxYMXbB7f3R2D.8b34jXi','ativo',1,'Rua I','54321-987','Sant','Florianópolis','Centro','321','Sala 123'),('2023-06-13 21:16:00.690447','2023-06-13 21:16:00.690447',NULL,15,'Patricia Oliveira','patricia.oliveira@example.com','$2b$10$wBFRIm6n1BKHVA21Xkh43ufkbMxgeA1C0/VyFL7RbSlBJee1gXE6S','ativo',2,'Rua J','13579-246','Para','Curitiba','Batel','654',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `yearManufacture` varchar(255) NOT NULL,
  `plate` varchar(255) NOT NULL,
  `dateAcquisition` datetime NOT NULL,
  `type` enum('passeio','caminhonete','caminhao','carreta','van') NOT NULL,
  `status` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'Gol','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png','2019-01-01T00:00:00.000Z','ABC-1234','2020-06-14 21:00:00','passeio','ativo','2023-06-13 21:16:00.698176','2023-06-14 09:34:58.256334',NULL),(2,'Onix','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png','2020-04-01T00:00:00.000Z','DEF-5678','2020-10-19 21:00:00','passeio','ativo','2023-06-13 21:16:00.698986','2023-06-14 09:35:04.066090',NULL),(3,'Hilux','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/hilux.png','2018-06-01T00:00:00.000Z','JKL-3456','2019-03-04 21:00:00','caminhonete','ativo','2023-06-13 21:16:00.699548','2023-06-14 09:39:27.331641',NULL),(4,'S10','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/hilux.png','2022-03-01T00:00:00.000Z','MNO-7890','2022-06-29 21:00:00','caminhonete','ativo','2023-06-13 21:16:00.699799','2023-06-14 09:39:29.710082',NULL),(5,'Volvo FH','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck.png','2020-01-01T00:00:00.000Z','STU-5678','2020-08-21 21:00:00','carreta','ativo','2023-06-13 21:16:00.700368','2023-06-14 09:35:41.737645',NULL),(6,'Corolla','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png','2021-09-01T00:00:00.000Z','GHI-9012','2021-12-09 21:00:00','passeio','inativo','2023-06-13 21:16:00.699303','2023-06-14 09:35:09.706270',NULL),(7,'HR','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck2.png','2017-08-01T00:00:00.000Z','PQR-1234','2018-02-11 22:00:00','caminhao','inativo','2023-06-13 21:16:00.700068','2023-06-14 09:36:50.277545',NULL),(8,'Mercedes-Benz Actros','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck3.png','2019-10-01T00:00:00.000Z','YZA-3456','2020-04-14 21:00:00','carreta','ativo','2023-06-13 21:16:00.700789','2023-06-14 09:36:58.494143',NULL),(9,'Scania R440','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck.png','2022-05-01T00:00:00.000Z','VWX-9012','2022-09-04 21:00:00','carreta','ativo','2023-06-13 21:16:00.701200','2023-06-14 09:36:31.368752',NULL),(10,'Fiesta','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png','2015-02-01T00:00:00.000Z','BCD-7890','2016-07-07 21:00:00','passeio','ativo','2023-06-13 21:16:00.701484','2023-06-14 09:35:15.211416',NULL),(11,'Amarok','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/hilux.png','2021-12-01T00:00:00.000Z','HIJ-5678','2022-03-09 21:00:00','caminhonete','ativo','2023-06-13 21:16:00.708262','2023-06-14 09:39:34.527744',NULL),(12,'Civic','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png','2023-01-01T00:00:00.000Z','EFG-1234','2023-04-30 21:00:00','passeio','ativo','2023-06-13 21:16:00.708951','2023-06-14 09:35:20.051346',NULL),(13,'Ducato','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck3.png','2019-04-01T00:00:00.000Z','KLM-9012','2019-07-17 21:00:00','van','ativo','2023-06-13 21:16:00.709384','2023-06-14 09:36:08.415696',NULL),(14,'Bitrem','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/truck.png','2022-07-01T00:00:00.000Z','NOP-3456','2022-10-24 21:00:00','carreta','ativo','2023-06-13 21:16:00.709644','2023-06-14 09:35:43.759606',NULL),(15,'Uno','https://github.com/danielMachado3fs/app-rastrear-api/blob/master/src/public/vehicles/car.png','2017-05-01T00:00:00.000Z','QRS-7890','2017-09-05 21:00:00','passeio','ativo','2023-06-13 21:16:00.710189','2023-06-14 09:35:21.954118',NULL);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'app_scf'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-14  9:40:29
