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
-- Структура таблицы `info`
--

CREATE TABLE `info` (
  `id` int NOT NULL,
  `ip` varchar(255) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `info`
--

INSERT INTO `info` (`id`, `ip`, `time`) VALUES
(1, 'b7abc8604f865d4d9bbb754e3e6cfdb765ac340e9295bac8604bb9e08ddc74af', '2024-04-20 12:12:22'),
(2, '80eab359b9321e813729f2d9ff4e14f3864a5470b5403b1cea0a4dccde488e6f', '2024-04-20 12:18:36'),
(3, 'fcba65c7843498863c6ae4d84d5ade4d01b6cbae64df7c36fad0a4dcdbea4871', '2024-04-20 12:22:10'),
(4, 'f328349ac989ee6c12cfc6a065a23227aae5ffb6b5afa3183f54a0e53df14293', '2024-04-20 13:37:40'),
(5, '15a06386def2cdd0add25a3c51c71dc22f6ee0d333d82ee0f1a1d547468e886c', '2024-04-20 14:36:30'),
(6, 'f2fbff96a2317b4ec5aed3cc8d574a6b5717ad9ca0e42eec026de84c1f68f6c9', '2024-04-22 15:02:24'),
(7, '9a1caac200836fb023e32c202dd41a8914eadcc51bcab39d8b49fd4ea434964c', '2024-04-22 17:50:07');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `info`
--
ALTER TABLE `info`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
