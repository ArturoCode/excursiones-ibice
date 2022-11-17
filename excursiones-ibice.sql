-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-11-2022 a las 21:34:22
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `excursiones-ibice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blog`
--

CREATE TABLE `blog` (
  `id_entrada` int(11) NOT NULL,
  `titulo_entrada` text NOT NULL,
  `url_imagen` varchar(128) NOT NULL,
  `descripcion_entrada` text NOT NULL,
  `seccion1` text NOT NULL,
  `seccion2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `blog`
--

INSERT INTO `blog` (`id_entrada`, `titulo_entrada`, `url_imagen`, `descripcion_entrada`, `seccion1`, `seccion2`) VALUES
(1, 'Las playas más bonitas de Asturias', '', 'En esta entrada os hablamos de las playas más bonitas de Asturias. Si después de leer este artículo os interesa alguna, próximamente tendremos excursiones que pasarán por una o varias de ellas...', 'La playa de Cudillero es también llamada Playa del Silencio.\r\n\r\nDe aspecto jurásico, esta es una de las playas más singulares de Asturias. Está enclavada en el Paisaje Protegido de la costa occidental asturiana y eso significa que el escenario es el propio de un arenal salvaje, enmarcado entre taludes rocosos y acantilados cubiertos de verde: es el espectáculo de la naturaleza, puro y sencillo. No hay que llegar a la playa en busca de chiringuitos y planes after sun. Más que silencio, lo que se nota es el murmullo constante de los cantos rodados que son empujados con las olas. No hay que olvidarse los escarpines en casa.', 'Al ser una pequeña playa de mar situada en el interior se considere a la playa de Gulpiyuri una de las más singulares de Asturias. Apenas tiene 50 metros de longitud de arena blanca que recibe el mar de forma indirecta, por debajo de los acantilados que la cercan. Por ello está catalogada como Monumento Nacional. No es accesible, por lo que para llegar a esta maravilla hay que caminar por un camino agrícola rodeado de prados. Prepárate, porque cuando la marea sube, parece una piscina salvaje más que una playa.\r\n\r\nPor último queremos hablar de la playa de Poo, porque tiene una belleza muy curiosa: junto a la desembocadura del Río Vallina, tiene forma de embudo, lo cual hace que desde sus 150 metros de arenal no se llegue a ver el mar en el horizonte. Esto es así sobre todo durante la bajamar. En cambio, cuando la marea sube, el mar de color esmeralda entra por el canal formado a lo largo de los siglos. El agua mansa, casi una piscina, es ideal para los juegos infantiles. En la playa de Poo los niños y los padres puedes disfrutar sin peligros. Suele estar muy concurrida, por lo que es mejor madrugar para pasar en ella un buen día de playa.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `excursiones`
--

CREATE TABLE `excursiones` (
  `id_excursion` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `nivel` text NOT NULL,
  `transporte` text NOT NULL,
  `destino` text NOT NULL,
  `hora_salida` time NOT NULL,
  `hora_regreso` time NOT NULL,
  `lugar_salida` text NOT NULL,
  `precio` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `material` text NOT NULL,
  `tiempo_atmosferico` text NOT NULL,
  `detalles` text NOT NULL,
  `url_imagen` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `excursiones`
--

INSERT INTO `excursiones` (`id_excursion`, `fecha_inicio`, `fecha_fin`, `nivel`, `transporte`, `destino`, `hora_salida`, `hora_regreso`, `lugar_salida`, `precio`, `descripcion`, `material`, `tiempo_atmosferico`, `detalles`, `url_imagen`) VALUES
(1, '2022-11-19', '2022-11-19', 'Básico', 'Bus', 'Guadalajara', '08:00:00', '20:30:00', 'Getafe', 24, 'En un entorno privilegiado Valverde de los Arroyos, el pueblo mas bonito de la arquitectura negra de Guadalajara, nos ofrece un paisaje alpino como ningún otro. Con el Pico Ocejón como telón de fondo y característica silueta, nos hará sentir pequeños bajo su falda. Sus abruptas y verticales laderas riegan el valle con las aguas del Arroyo de la Gargantilla, Angostura y de la Chorrera antes de unirse para dar paso al Rio Sorbe. El Arroyo de la Chorrera se precipita de manera ordenada y se desliza por la negra pizarra de la Sierra de Ayllon dando forma a la Chorrera de Despeñalagua, un capricho de la naturaleza, sin duda de sinigual belleza. (fin-parrafo)Antes de regresar a Madrid, haremos una parada en la Ermita del Enebral y la Ciudad Encantada de Tamajón, un capricho que el aire, el agua y el tiempo ha formado, dejando su huella dibujando en la roca caliza misteriosas formas y alguna que otra cueva que podremos descubrir mientras paseamos por tan singular lugar....te vienes?', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', '2°, Lluvia débil, Sensación T. 12°', 'INCLUYE: Transporte en autobús, Ruta de senderismo 8 km. nivel básico, Seguro básico accidentes. Guías', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `nombre_usuario` text NOT NULL,
  `membresia` text NOT NULL,
  `tipo_usuario` text NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `password`, `nombre_usuario`, `membresia`, `tipo_usuario`) VALUES
(1, 'administrador@excursionesibice.com', 'holamundo', 'administrador', 'Administrador', 'admin'),
(2, 'usuario@excursionesibice.com', 'holamundo', 'usuarioprueba', 'Usuario', 'usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id_entrada`);

--
-- Indices de la tabla `excursiones`
--
ALTER TABLE `excursiones`
  ADD PRIMARY KEY (`id_excursion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blog`
--
ALTER TABLE `blog`
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `excursiones`
--
ALTER TABLE `excursiones`
  MODIFY `id_excursion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
