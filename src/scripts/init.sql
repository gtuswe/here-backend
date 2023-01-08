-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: 34.79.132.20    Database: here
-- ------------------------------------------------------
-- Server version	5.7.39-google

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
-- Table structure for table `absence_reason`
--

DROP TABLE IF EXISTS `absence_reason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absence_reason` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `past_course_id` int(10) unsigned NOT NULL,
  `doc_id` int(10) unsigned NOT NULL,
  `confirmed` enum('t','f','w') NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `absence_reason_pk` (`id`,`doc_id`),
  KEY `absence_reason_student_null_fk` (`course_id`),
  KEY `absence_reason_student_id_fk` (`student_id`),
  KEY `absence_reason_past_course_null_fk` (`past_course_id`),
  CONSTRAINT `absence_reason_past_course_null_fk` FOREIGN KEY (`past_course_id`) REFERENCES `past_course` (`id`),
  CONSTRAINT `absence_reason_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence_reason`
--

LOCK TABLES `absence_reason` WRITE;
/*!40000 ALTER TABLE `absence_reason` DISABLE KEYS */;
/*!40000 ALTER TABLE `absence_reason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `person_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_pk` (`person_id`,`id`),
  CONSTRAINT `admin_person_null_fk` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(10) unsigned NOT NULL,
  `text` text NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `announcement_pk` (`id`,`time`),
  KEY `announcement_course_null_fk` (`course_id`),
  CONSTRAINT `announcement_course_null_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(10) unsigned NOT NULL,
  `past_course_id` int(10) unsigned NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `attendance_student_null_fk` (`student_id`),
  KEY `attendance_past_course_null_fk` (`past_course_id`),
  CONSTRAINT `attendance_past_course_null_fk` FOREIGN KEY (`past_course_id`) REFERENCES `past_course` (`id`),
  CONSTRAINT `attendance_student_null_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,5,1,'2023-01-06 10:29:31');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `instructor_id` int(10) unsigned NOT NULL,
  `code` varchar(255) NOT NULL,
  `min_attendance_percentage` float NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_pk` (`id`,`name`,`code`),
  KEY `course_instructor_null_fk` (`instructor_id`),
  CONSTRAINT `course_instructor_null_fk` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (4,'Software Engineering','test',5,'CSE344',81,'2022-11-27','2023-02-11');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `person_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `person_id_UNIQUE` (`person_id`),
  CONSTRAINT `id` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (5,23),(6,26),(7,30),(8,57),(9,58),(10,59),(11,60),(12,61);
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor_has_course`
--

DROP TABLE IF EXISTS `instructor_has_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor_has_course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `instructor_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `instructor_has_class_course_null_fk` (`course_id`),
  KEY `instructor_has_class_instructor_null_fk` (`instructor_id`),
  CONSTRAINT `instructor_has_class_course_null_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `instructor_has_class_instructor_null_fk` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor_has_course`
--

LOCK TABLES `instructor_has_course` WRITE;
/*!40000 ALTER TABLE `instructor_has_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `instructor_has_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `past_course`
--

DROP TABLE IF EXISTS `past_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `past_course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(10) unsigned NOT NULL,
  `period_id` int(10) unsigned NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `past_course_course_null_fk` (`course_id`),
  KEY `past_course_period_null_fk` (`period_id`),
  CONSTRAINT `past_course_course_null_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `past_course_period_null_fk` FOREIGN KEY (`period_id`) REFERENCES `period` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `past_course`
--

LOCK TABLES `past_course` WRITE;
/*!40000 ALTER TABLE `past_course` DISABLE KEYS */;
INSERT INTO `past_course` VALUES (1,4,1,'2023-01-06 10:25:11');
/*!40000 ALTER TABLE `past_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `week_day` enum('mon','tue','wed','thu','fri','sat','sun') NOT NULL,
  `start_time` int(11) NOT NULL COMMENT 'Start time in minute of the day',
  `end_time` int(11) NOT NULL COMMENT 'End time in minute of the day',
  `course_id` int(10) unsigned NOT NULL,
  `location` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `period_pk` (`id`),
  KEY `period_course_null_fk` (`course_id`),
  CONSTRAINT `period_course_null_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `period`
--

LOCK TABLES `period` WRITE;
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
INSERT INTO `period` VALUES (1,'mon',13,16,4,'Z23');
/*!40000 ALTER TABLE `period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `person_pk` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (22,'Ozann','Armagan','$2b$10$ixv2PnBuFuFkpsfpMg63G.JHJzt4zL83yOk8WXpb93G6VipoF6q7i','ozan@gtu.edu.tr'),(23,'Ozan','Armaganm','$2b$10$FPxmuKG3g5x1OLYVEvd4DetnkiqddQF8ohpcwaKpdaUR4byP4hpdG','ozannn@gtu.edu.tr'),(25,'Serhat','Sarı','$2b$10$g5YdgzONJ8zn/Eqlcp7EuOcvBEuQkAlghj1qi3S0d.6MF7xC78tbK','serhatt@gtu.edu.tr'),(26,'Asuman Sare','Ergün','$2b$10$2DZiKEc8Ag3WUdK9iwUS4eiYX6QUIx57guXM9VR9.49y5FwX/4vf2','asuman@gtu.edu.tr'),(27,'Serhat','SARI','$2b$10$zA80BZ4vxcJOCpsink9fgOlSD0O5Z0hTGCBSCRNy2Qu8Gc9jnIhjq','test@gtu.edu.tr'),(28,'Atacan','Başaran','$2b$10$PNcYYdFmqgsF1F79AfhnsO5RTMw.RKKiI9x.etZ3F8MpOVf.FKSYS','a.basaran2020@gtu.edu.tr'),(29,'Serhat','Sarı','$2b$10$0i5xiYvlsSy/frBwMm.Bye7vH/zvFsw0C/O6LWQS.uxHXZm81mhNe','s.sari2020@gtu.edu.tr'),(30,'Habil','Kalkan','$2b$10$K1S9P0xD0Z.JKpQ7lMB2S.x9T2YzcqbUzVAh6pmyXxu.8fkd4v1t.','habilkalkan@gtu.edu.tr'),(31,'atacan','basaran','$2b$10$WC1ixzSZmz3Es1yOr5ZQcOkqHGFndL4Kgtp.eEjfdaiF4fB.uQorq','atacan@gmail.com'),(32,'12345','12345','$2b$10$AgbUINuYLHp6mwdmo9TwdOHN41v1xDaElSOaoEURSJ19mFf1JuBfm','xd@gtu.edu.tr'),(33,'atascan','basaran','$2b$10$b9RECAayDTVt9NDN1VxIneb0xpT7UVEQmb2gfash63xvtsFsI2iaS','deneme@gmail.com'),(34,'cc','cc','$2b$10$PsgQg0vlQfluO2DMRpOB6OhGYbmmAhqmYPiVqUYtF.pu69eMtwr0K','cc@gmail.com'),(35,'cs','cs','$2b$10$ismdwdmuMhWxtrfFwJ32OetzuqmdbkkK9Ryq2jUhGp4fqxn..L1.G','x@gmail.com'),(36,'ab','cd','$2b$10$uKe4i9U3eZ5jrXikTNFMROZpUZbKrkWsQZtRKwalMLWmx4z70isIm','cv@gmail.com'),(37,'ab','cd','$2b$10$IPXrMEXGszt/QpXnCPBEJO24tJCELgvKFTdGRgwXESA78lVtdXf.e','dd@gmail.com'),(38,'ata','can','$2b$10$uMUJRkw0C8yV.sa3YLWyseWZe4kOyb/tu04Bi195oE/kmJbe5Pgg.','aabbcc@gmail.com'),(39,'ss','bb','$2b$10$EFdqMoV/Ly8otb/A9RcxVevFc8oiR0feB4O5QlnzDVBumg/GimJAy','vb@gmail.com'),(40,'atacan','basaran','$2b$10$80eDSH3cLi2z6a1DOW11SeEAxOfjYZs8u7.BH0N.KQvFL81KCLQZ.','denemxe@gmail.com'),(41,'atacan','basaran','$2b$10$aFjXR/nsX3Tbmg/CLZ/fw.fz4KP8E03tnpC.FbIwr0uxlY0mgC3yq','denemdkdsxe@gmail.com'),(42,'serhat','sari','$2b$10$tx7ko.i.2RHOkmtIF9vpZuqgMPwaOTzp1MJCir3UHJ2jm4/aIcelC','mm@gmail.com'),(43,'jdje','djsj','$2b$10$ztmiWp1UDEwf.KUW/UeJxukgxwqIzlCLb08w5GnUZTkVvx2TrIylq','dnsjwj@jdsjwjw.cim'),(44,'cc','bb','$2b$10$ccmkvfoYLTBKMuS22GPVx.fJj3PShUcRCSLwuyAmq.Ar.6sM7gwxy','xn@gmail.com'),(45,'cc','bb','$2b$10$QVmYyTOQVKmWNEAWxcxxKeRQNxfICxCMQj4qiMxTejcbMKOqZNOA2','xxn@gmail.com'),(46,'firstName','lastName','$2b$10$FjZn1xWwyDiGdZl2a9WfROyWW1djFK9uzw8ySTzsSqUAbm34l.Tra','email@gmail.com'),(47,'firstNames','s','$2b$10$LbSU92eEaTsnDCn/18HvV.n8QazUMoKjbruOaYh7sujsij58fFUG6','ss@gmail.com'),(48,'jejwwjw','cjdnwj','$2b$10$M0MQ0xYRmHyJ/I3c61RkGurdt3AnP3pGdYrgBHYsPrJhvmEYbxbGu','denemesz@gmail.com'),(49,'jejwwjw','cjdnwj','$2b$10$Qx1YqHTxMZbNJv4tM/G9B.M8rq1aVw4.vyU1bv38CdZoa35HSlz76','denemsesz@gmail.com'),(50,'cjdjwj','siwjwjw','$2b$10$mXyLKNPlm/Xud5GBu1sg5.2X67.toSQccDN1dwNcjC0UoVSem5aAa','denednsjme@gmail.com'),(51,'cjdjwj','siwjwjw','$2b$10$nksW2GMSuHLQd9mBAewzV.mddXfb4jiJ9asbvZBLJz0q/IHf5rd6O','dendrednsjme@gmail.com'),(52,'cjdjwj','siwjwjw','$2b$10$P61W3R/X4.W0wZq2GhFmgejQ.vTJKIFV7fWPIc4obxPlLRhh9bFzu','dendrecrfednsjme@gmail.com'),(53,'cjdjwj','siwjwjw','$2b$10$e0k2JhIJNY8X1rJIrqCsVeDmc3kRyWaGJKpAgbswaUTU2m8GKAgqa','dendrddecrfednsjme@gmail.com'),(54,'ndjsja','sjwjw','$2b$10$vcWmUYiUTPPMGayX8NhXAOMFVikLfU6DPUIJFoIifbOJNhWbtx3f.','denemfjdje@gmail.com'),(55,'djsjwu','dejejwjw','$2b$10$TP8tUAeyGa/2geThgOuKXO2QpPuojmXJppZhF0ypmPGR9DHWcJhSq','denemfjdjse@gmail.com'),(56,'djsjwu','dejejwjw','$2b$10$UHWsQV0AS1P.tZ3pzEdXK.qidSIfuL6jhp51CWPSz0tZPa/ZqOPyO','denemfjdjsdde@gmail.com'),(57,'Serhat','SARI','$2b$10$SVb656hAmXqxt/DXN7CsHeb/LvkHa2iy236ZqEqFbO1KAGeC.TGh2','serhhatsari@gmail.com'),(58,'serhat','yeşil','$2b$10$tyJLeZ9bzWdfMjuOad8ZQ./nl07rh6LPRsrv1iSjY8E7LBrYqOruu','serhat@gtu.edu.tr'),(59,'Abdullah','KIRICIOGLU','$2b$10$Yd4su858dQ8xA1N8qm/PmOVrMR40seUMRvNW9jKfQwKM/rRrcT0pK','abdullah@gtu.edu.tr'),(60,'çok gizli','bir nick','$2b$10$coK3xASa0lveSugXkdax1eMDAXgBkOJyFmNQ9yIFGGc6XHzqwbkdG','çokgizlibir@email.com'),(61,'Mahmut','Bozyer','$2b$10$wH2cXZKsyE1uEGGiZKTaPusaj/JjjEXqOEKt4sWHcN/JtPHqTXWiO','oramagomaburamago@gmail.com'),(66,'Halil','Ibrahim','$2b$10$/YqJ84upNtOjN5gir98v7ufBEhjoJGL4GaSs/aFv7IzhZ0EskkOC2','h.ilhan2020@gtu.edu.tr'),(67,'halil','ibrahim','$2b$10$1zKFvdIz0AZRgTBjTqgd4.9AOZi6q5cWQcrYhearYqCzQ6TKUGDIa','zzy@gmail.com'),(68,'halil','ibrahim','$2b$10$b51FzD6Mhqjn0rrWUWyEqeiHsSjHvMrqqaoDgXLd1Zl0sE3dItrT.','zxz@gmail.com'),(69,'atacan','basaran','$2b$10$PcXLWhLmousHFEPm5I6CjeesnJ5OeQnLpLBjRJ/mvDguXJ2nyfoUy','atacanbasaran74@gmail.com'),(70,'cici','cici','$2b$10$NL2gk8z6Br8F5BNdkcDYlOOFtzPwzM7b97m5GXpCQ4P3b/OCkcX4u','yy@gmail.com'),(71,'bloox','bloo','$2b$10$sOvUTKd7o.Cptg3pHax/helVs/OCE7RXuwgqVgu41.XFLWtB3oQ3W','nnax@gmail.com');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `person_id` int(10) unsigned NOT NULL,
  `student_no` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_pk` (`student_no`,`person_id`),
  KEY `student_person_null_fk` (`person_id`),
  CONSTRAINT `student_person_null_fk` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (8,32,',,,,,'),(3,25,'1111'),(16,44,'121223'),(17,45,'1212234'),(10,34,'123'),(18,46,'12321321424'),(7,31,'12345'),(12,39,'1234512345'),(9,33,'123456'),(11,38,'12345678'),(13,41,'1238544'),(4,27,'159'),(29,67,'197653112'),(30,68,'1976589'),(5,28,'200104004008'),(31,69,'2001040040087'),(2,22,'200104004014'),(28,66,'200104004048'),(6,29,'200104028'),(19,47,'2132167568976812'),(20,48,'56164959'),(21,49,'56164959564'),(15,43,'56464646'),(25,54,'6161498956'),(32,70,'743474'),(33,71,'7535751'),(26,55,'95911646'),(27,56,'95911646492'),(14,42,'987654321'),(22,50,'98946416'),(23,52,'98946582815416'),(24,53,'9894658281541652');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_has_course`
--

DROP TABLE IF EXISTS `student_has_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_has_course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_has_class_course_null_fk` (`course_id`),
  KEY `student_has_class_student_null_fk` (`student_id`),
  CONSTRAINT `student_has_class_course_null_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `student_has_class_student_null_fk` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_has_course`
--

LOCK TABLES `student_has_course` WRITE;
/*!40000 ALTER TABLE `student_has_course` DISABLE KEYS */;
INSERT INTO `student_has_course` VALUES (1,5,4);
/*!40000 ALTER TABLE `student_has_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-08 14:42:29
