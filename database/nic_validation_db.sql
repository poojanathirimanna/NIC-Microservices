-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nic_validation_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `nic_records`
--

DROP TABLE IF EXISTS `nic_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nic_records` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nic_number` varchar(255) DEFAULT NULL,
  `birthday` date NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nic_number` (`nic_number`)
) ENGINE=InnoDB AUTO_INCREMENT=921 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nic_records`
--

LOCK TABLES `nic_records` WRITE;
/*!40000 ALTER TABLE `nic_records` DISABLE KEYS */;
INSERT INTO `nic_records` VALUES (853,'200003400123','2000-02-03',25,'Male','valid_nic_sample_1.csv','2025-08-08','dushan'),(854,'199936512345','1999-12-31',25,'Male','valid_nic_sample_2.csv','2025-08-08','dushan'),(855,'200550812345','2005-01-08',20,'Female','valid_nic_sample_3.csv','2025-08-08','dushan'),(856,'198812912345','1988-05-08',37,'Male','valid_nic_sample_4.csv','2025-08-08','dushan'),(881,'822577095V','1982-09-14',42,'Male','nic_file_6.csv','2025-08-08','poojana'),(882,'325482295V','1932-02-17',93,'Female','nic_file_6.csv','2025-08-08','poojana'),(883,'721558576X','1972-06-03',53,'Male','nic_file_6.csv','2025-08-08','poojana'),(884,'260379739V','1926-02-06',99,'Male','nic_file_5.csv','2025-08-08','poojana'),(885,'296949539X','1929-07-13',96,'Female','nic_file_5.csv','2025-08-08','poojana'),(886,'192996944V','1919-10-26',105,'Male','nic_file_5.csv','2025-08-08','poojana'),(887,'318431962V','1931-12-09',93,'Female','nic_file_5.csv','2025-08-08','poojana'),(888,'185208651V','1918-01-20',107,'Female','nic_file_5.csv','2025-08-08','poojana'),(889,'703620437V','1970-12-28',54,'Male','nic_file_2.csv','2025-08-08','poojana'),(890,'317268191X','1931-08-14',93,'Female','nic_file_2.csv','2025-08-08','poojana'),(891,'931640841X','1993-06-13',32,'Male','nic_file_2.csv','2025-08-08','poojana'),(892,'766059051X','1976-04-14',49,'Female','nic_file_2.csv','2025-08-08','poojana'),(893,'255845433V','1925-03-25',100,'Female','nic_file_2.csv','2025-08-08','poojana'),(894,'372370065X','1937-08-25',87,'Male','nic_file_1 - Copy.csv','2025-08-08','poojana'),(895,'652399202V','1965-08-27',59,'Male','nic_file_1 - Copy.csv','2025-08-08','poojana'),(896,'696612837V','1969-06-10',56,'Female','nic_file_1 - Copy.csv','2025-08-08','poojana'),(897,'066607218X','1906-06-09',119,'Female','nic_file_1 - Copy.csv','2025-08-08','poojana'),(898,'412066527V','1941-07-25',84,'Male','nic_file_1 - Copy.csv','2025-08-08','poojana'),(899,'870593635X','1987-02-28',38,'Male','nic_file_1 - Copy.csv','2025-08-08','poojana'),(900,'895627995V','1989-03-03',36,'Female','nic_file_1 - Copy.csv','2025-08-08','poojana');
/*!40000 ALTER TABLE `nic_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'poojana','$2a$10$OFZIbPSqYYv9lNnOBdf1TeTJaYCeH9PCCSCnlVCM77OeQzkdEtp06','2025-08-06 10:38:50','poojana@gmail.com'),(13,'dushan','$2a$10$o7RfzDhrDasDRfQPQmWHIOtDkrVImGTFDIBliS4iGHRA5ZswQU.9i','2025-08-08 03:13:47','dushan@gmail.com'),(14,'alex','$2a$10$NTRvFH9drmPI7nabTXwYHuDb2WaoYTgkXBAMBRj6agq0jEa2UofvG','2025-08-08 16:12:25','alex@gmail.com');
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

-- Dump completed on 2025-08-08 17:41:01
