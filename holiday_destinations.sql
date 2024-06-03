-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+jammy2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Апр 24 2024 г., 20:42
-- Версия сервера: 8.0.36-0ubuntu0.22.04.1
-- Версия PHP: 8.3.3-1+ubuntu22.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `user`
--

-- --------------------------------------------------------

--
-- Структура таблицы `holiday_destinations`
--

CREATE TABLE `holiday_destinations` (
  `id` int NOT NULL,
  `destination` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `search_count` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `holiday_destinations`
--

INSERT INTO `holiday_destinations` (`id`, `destination`, `country`, `search_count`) VALUES
(52, 'Tokyo', 'Japan', 5),
(53, 'London', 'United Kingdom', 25),
(54, 'Sydney', 'Australia', 27),
(55, 'New York', 'United States of America', 2),
(56, 'Paris', 'France', 3),
(57, 'Bratislava', 'Slovakia', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `holiday_destinations`
--
ALTER TABLE `holiday_destinations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `holiday_destinations`
--
ALTER TABLE `holiday_destinations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
