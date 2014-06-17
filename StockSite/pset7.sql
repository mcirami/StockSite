-- MySQL dump 10.14  Distrib 5.5.32-MariaDB, for Linux (i686)
--
-- Host: localhost    Database: pset7
-- ------------------------------------------------------
-- Server version	5.5.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Portfolio`
--

DROP TABLE IF EXISTS `Portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Portfolio` (
  `id` int(10) unsigned NOT NULL,
  `symbol` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `shares` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`,`symbol`),
  KEY `shares` (`shares`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Portfolio`
--

LOCK TABLES `Portfolio` WRITE;
/*!40000 ALTER TABLE `Portfolio` DISABLE KEYS */;
INSERT INTO `Portfolio` VALUES (10,'NADUSD=X',5),(1,'FB',10),(4,'CSCO',10),(7,'DVN.V',10),(8,'AAPL',10),(8,'DVN.V',10),(10,'EURUSD=X',10),(8,'FB',15),(10,'CWTR',17),(2,'SIRI',20),(5,'AAPL',20),(6,'DVN.V',20),(10,'AAPL',20),(10,'FB',20),(6,'GOOG',25),(9,'WMT',25),(7,'BAC',30),(3,'BAC',50);
/*!40000 ALTER TABLE `Portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `id` int(10) unsigned NOT NULL,
  `transaction` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `datetime` datetime NOT NULL,
  `symbol` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `shares` int(10) unsigned NOT NULL,
  `price` decimal(64,4) unsigned NOT NULL,
  KEY `transaction` (`transaction`),
  KEY `id` (`transaction`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (10,'BUY','2014-04-16 20:33:35','AAPL',2,519.0100),(10,'BUY','2014-04-17 15:28:43','DVN.V',2,0.1600),(10,'SELL','2014-04-17 15:29:54','DVN.V',22,0.1600),(10,'BUY','2014-04-17 16:49:28','FB',10,58.9400),(10,'BUY','2014-04-17 20:24:24','FB',15,58.9400),(10,'BUY','2014-04-17 20:25:02','DVN.V',50,0.1600),(10,'SELL','2014-04-17 20:28:59','AAPL',4,524.9400),(10,'SELL','2014-04-17 20:30:49','FB',25,58.9400),(10,'BUY','2014-04-17 21:04:32','FB',20,58.9400),(10,'SELL','2014-04-17 21:05:21','DVN.V',50,0.1600),(10,'BUY','2014-04-17 21:12:02','AAPL',10,524.9400),(10,'BUY','2014-04-17 21:12:09','AAPL',10,524.9400),(10,'BUY','2014-04-17 21:19:22','NADUSD=X',5,0.0954),(10,'BUY','2014-04-17 21:20:56','EURUSD=X',10,1.3810),(10,'BUY','2014-04-17 21:22:47','CWTR',10,0.0465),(10,'SELL','2014-04-17 21:23:23','CWTR',10,0.0465),(10,'BUY','2014-04-17 21:23:35','CWTR',17,0.0465);
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cash` decimal(65,4) unsigned NOT NULL DEFAULT '0.0000',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'caesar','$1$50$GHABNWBNE/o4VL7QjmQ6x0',10000.0000,''),(2,'hirschhorn','$1$50$lJS9HiGK6sphej8c4bnbX.',10000.0000,''),(3,'jharvard','$1$50$RX3wnAMNrGIbgzbRYrxM1/',10000.0000,''),(4,'malan','$1$HA$azTGIMVlmPi9W9Y12cYSj/',10000.0000,''),(5,'milo','$1$HA$6DHumQaK4GhpX8QE23C8V1',10000.0000,''),(6,'skroob','$1$50$euBi4ugiJmbpIbvTTfmfI.',10000.0000,''),(7,'zamyla','$1$50$uwfqB45ANW.9.6qaQ.DcF.',10000.0000,''),(8,'mcirami','$1$XBsejEz2$e8jWzwDvQsxSxS1j.uoMD.',10000.0000,''),(9,'booby','$1$guD8Murz$AyzRk.RAKCWzhFc7.icGq/',10000.0000,''),(10,'mcirami5','$1$tF3O0ckq$Lc36q3cL3QOwvZr1dwJ05/',4330.8700,'mcirami@gmail.com');
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

-- Dump completed on 2014-04-18 12:24:51
