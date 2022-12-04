-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: 34.67.245.105    Database: here
-- ------------------------------------------------------
-- Server version	5.7.39-google-log

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '4a9a1f0c-6cbd-11ed-a5bb-42010a800003:1-106294';

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (2,'Software Engineering','test',5,'CSE343',75,'2022-11-27','2023-02-11');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (5,23),(6,26);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `past_course`
--

LOCK TABLES `past_course` WRITE;
/*!40000 ALTER TABLE `past_course` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `period`
--

LOCK TABLES `period` WRITE;
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
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
  `phone_number` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `person_pk` (`mail`,`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (22,'Ozan','Armagan','$2b$10$ixv2PnBuFuFkpsfpMg63G.JHJzt4zL83yOk8WXpb93G6VipoF6q7i','ozan@gtu.edu.tr','5312559908'),(23,'Ozan','Armaganm','$2b$10$FPxmuKG3g5x1OLYVEvd4DetnkiqddQF8ohpcwaKpdaUR4byP4hpdG','ozannn@gtu.edu.tr','5312559900'),(25,'Serhat','Sarı','$2b$10$g5YdgzONJ8zn/Eqlcp7EuOcvBEuQkAlghj1qi3S0d.6MF7xC78tbK','serhatt@gtu.edu.tr','5312221100'),(26,'Asuman Sare','Ergün','$2b$10$2DZiKEc8Ag3WUdK9iwUS4eiYX6QUIx57guXM9VR9.49y5FwX/4vf2','asuman@gtu.edu.tr','5332221100');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (3,25,'1111'),(2,22,'200104004014');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_has_course`
--

LOCK TABLES `student_has_course` WRITE;
/*!40000 ALTER TABLE `student_has_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_has_course` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-01 19:20:54
