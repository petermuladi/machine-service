-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
-- My sql schema to the project.

CREATE DATABASE `machine-service`;

USE `machine-service`;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `termek_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `telefon` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
); 

--
INSERT INTO `contacts` (`id`, `termek_id`, `nev`, `telefon`, `email`) VALUES
(20, 9, 'Első Személy', '123456789', 'elsoszemely@gmail.com'),
(21, 10, 'Második Személy', '234567890', 'masodikszemely@gmail.com'),
(22, 11, 'Harmadik Személy', '345678901', 'harmadikszemely@gmail.com'),
(23, 12, 'Negyedik Személy', '456789012', 'negyedikszemely@gmail.com'),
(24, 13, 'Ötödik Személy', '567890123', 'otodikszemely@gmail.com'),
(25, 14, 'Teszt Név', '123-4567', 'test@gmail.com'),
(40, 36, 'Teszt Név1', '0630 123-4567', 'test@mail.com');


CREATE TABLE `szervizelt_termekek` (
  `id` int(11) NOT NULL,
  `leadas_datuma` date NOT NULL,
  `szeriaszam` varchar(255) NOT NULL,
  `gyarto` varchar(255) NOT NULL,
  `tipus` varchar(255) NOT NULL,
  `statusz` enum('Beérkezett','Hibaelhárítás','Alkatrész beszerzés alatt','Javítás','Kész') NOT NULL,
  `statusz_valtozas_datuma` datetime NOT NULL
); 


INSERT INTO `szervizelt_termekek` (`id`, `leadas_datuma`, `szeriaszam`, `gyarto`, `tipus`, `statusz`, `statusz_valtozas_datuma`) VALUES
(9, '2022-01-01', '12345', 'Gyarto1', 'Tipus1', 'Alkatrész beszerzés alatt', '2023-02-14 01:32:27'),
(10, '2022-01-02', '67890', 'Gyarto2', 'Tipus2', 'Beérkezett', '2023-02-14 01:32:27'),
(11, '2022-01-03', '24680', 'Gyarto3', 'Tipus3', 'Javítás', '2023-02-14 01:32:27'),
(12, '2022-01-04', '13579', 'Gyarto4', 'Tipus4', 'Hibaelhárítás', '2023-02-14 01:32:27'),
(13, '2022-01-05', '97531', 'Gyarto5', 'Tipus5', 'Alkatrész beszerzés alatt', '2023-02-14 01:32:27'),
(14, '2023-02-16', '123456', 'Samsung', 'S-25698', 'Javítás', '2023-02-16 00:55:23'),
(36, '2023-02-17', 'GBD-124566', 'Apple', 'Iphone 12', 'Hibaelhárítás', '2023-02-17 09:55:35');


ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `contacts_email` (`email`),
  ADD KEY `termek_id` (`termek_id`);


ALTER TABLE `szervizelt_termekek`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

ALTER TABLE `szervizelt_termekek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;


ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`termek_id`) REFERENCES `szervizelt_termekek` (`id`);
COMMIT;
