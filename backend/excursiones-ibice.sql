-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-11-2022 a las 12:40:00
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
  `url_imagen_principal` text NOT NULL,
  `descripcion_entrada` text NOT NULL,
  `url_imagen` varchar(128) NOT NULL,
  `texto_entrada` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `blog`
--

INSERT INTO `blog` (`id_entrada`, `titulo_entrada`, `url_imagen_principal`, `descripcion_entrada`, `url_imagen`, `texto_entrada`) VALUES
(1, 'Las playas más bonitas de Asturias', 'http://localhost:2000/images/asturias1.jpg', 'En esta entrada os hablamos de las playas más bonitas de Asturias. Si después de leer este artículo os interesa alguna, próximamente tendremos excursiones que pasarán por una o varias de ellas...', 'http://localhost:2000/images/asturias1.jpg,http://localhost:2000/images/asturias2.jpg,http://localhost:2000/images/asturias3.jpg', 'La playa de Cudillero es también llamada Playa del Silencio. De aspecto jurásico, esta es una de las playas más singulares de Asturias. Está enclavada en el Paisaje Protegido de la costa occidental asturiana y eso significa que el escenario es el propio de un arenal salvaje, enmarcado entre taludes rocosos y acantilados cubiertos de verde: es el espectáculo de la naturaleza, puro y sencillo. No hay que llegar a la playa en busca de chiringuitos y planes after sun. Más que silencio, lo que se nota es el murmullo constante de los cantos rodados que son empujados con las olas. No hay que olvidarse los escarpines en casa.(fin-parrafo)Al ser una pequeña playa de mar situada en el interior se considera a la playa de Gulpiyuri una de las más singulares de Asturias. Apenas tiene 50 metros de longitud de arena blanca que recibe el mar de forma indirecta, por debajo de los acantilados que la cercan. Por ello está catalogada como Monumento Nacional. No es accesible, por lo que para llegar a esta maravilla hay que caminar por un camino agrícola rodeado de prados. Prepárate, porque cuando la marea sube, parece una piscina salvaje más que una playa.(fin-parrafo)Por último queremos hablar de la playa de Poo, porque tiene una belleza muy curiosa: junto a la desembocadura del Río Vallina, tiene forma de embudo, lo cual hace que desde sus 150 metros de arenal no se llegue a ver el mar en el horizonte. Esto es así sobre todo durante la bajamar. En cambio, cuando la marea sube, el mar de color esmeralda entra por el canal formado a lo largo de los siglos. El agua mansa, casi una piscina, es ideal para los juegos infantiles. En la playa de Poo los niños y los padres puedes disfrutar sin peligros. Suele estar muy concurrida, por lo que es mejor madrugar para pasar en ella un buen día de playa.'),
(2, 'Pasar Halloween en el castillo de Riba de Santiuste ', 'http://localhost:2000/images/santi1.jpg', 'En esta entrada os hablamos del castillo de Riba de Santiuste y las misteriosas leyendas que circulan por él. Perfecto para explorarlo en Halloween y así no hacer los típicos planes. Si después de leer este artículo os interesa visitarlo, tenemos una excursión que pasa por este castillo rodeado de misterio.', 'http://localhost:2000/images/santi1.jpg,http://localhost:2000/images/santi2.jpg,http://localhost:2000/images/santi3.jpg', 'El castillo de Riba de Santiuste es una fortificación española situada en Riba de Santiuste, pedanía de Sigüenza (Guadalajara). Fue construido en el siglo IX en época andalusí con el fin de defender la zona de la conquista castellana y sufrió una ampliación y reconstrucción a finales del siglo XII de parte del obispado de Sigüenza.(fin-parrafo)Está plantado sobre la cresta de un cerro lleno de pliegues y fracturas, de estratos de arenisca roja y amarilla, de cristales de sal y de ripples, las ondas dibujadas por la marea en una playa millones de años atrás. Ha sido lugar de reunión de miembros de Nueva Acrópolis, organización internacional sin ánimo de lucro ni propósito claro. Y tiene fantasma, una tal Manuela, a la que el presentador Íker Jiménez dedicó un reportaje en el programa Cuarto Milenio.(fin-parrafo)En las horas próximas al amanecer, una dama con túnica blanca recorre el castillo, entre alaridos y lamentos. Sus sollozos entrecortados, y el sonido de sus pasos aumentan en el pasillo de las apariciones hasta llegar a la sala anexa. Es la hermosa Manuela, que llora su pena. Unos cuentan que Manuela era la hija del alcaide árabe del castillo, y estaba prometida con un rico musulman al que no amaba. En un hecho de armas, Manuela conoció a un cristiano del que se enamoró y con el que le fue infiel a su prometido. Descubierta, el alcaide furioso la degúella en la sala y arrastra su cuerpo por el pasillo hasta el aljibe del patio, donde lo arroja.'),
(3, 'Aguas termales en los Pirineos', 'http://localhost:2000/images/termas0.jpg', 'En esta entrada os hablamos de las aguas termales que se encuentran en la zona de los Pirineos. Si después de leer este artículo os interesa alguna, próximamente tendremos excursiones que pasarán por una o varias de ellas...', 'http://localhost:2000/images/termas1.jpg,http://localhost:2000/images/termas2.jpg,http://localhost:2000/images/termas4.jpg', 'La lluvia se cuela por grietas y en su descenso se calienta y se pone en contacto con minerales que la enriquecerán y variarán su composición (el agua pirenaica es pobre en cal porque se filtra por rocas graníticas). El agua se calienta a razón de 1ºC cada 30 m de profundidad, de manera que a 1000 m ya alcanza los 30 ºC, que es la temperatura mínima a la que brota en los manantiales pirenaicos. El baño de agua termal aumenta la circulación de la sangre, abre los poros y favorece la expulsión de toxinas, y relaja la musculatura. He aquí una selección para disfrutar de todas sus bondades por los Pirineos.(fin-parrafo)Los Baños de Benasque se sitúan entre los más altos de Europa, a 1720 metros de altitud, al pie del Parque Natural Posets-Maladeta, que incluye el Aneto (3404 m), el techo de los Pirineos. Además de por las propiedades terapéuticas de sus aguas termales, el balneario de Benasque destaca por su magnífico entorno natural y por los pueblos montañeses del valle en que se encuentra, un destino para disfrutar del senderismo, la escalada, la bicicleta de montaña y el esquí alpino y nórdico en las estaciones de Cerler y Llanos del Hospital. El balneario actual se empezó a construir en 1801, pero las aguas termales del lugar eran conocidas de mucho antes, como demuestran los textos de 1522 y 1721, que hablan de las virtudes de sus aguas.(fin-parrafo)Revolcarse en la nieve y, inmediatamente después, sumergirse en agua caliente contemplando la silueta del Puigmal (2913 m). Esta experiencia tonificante (por decirlo suavemente) se puede vivir en los baños de Dorres, un pueblecito de la Cerdanya francesa, a poca distancia de Puigcerdà. Comparado con otros baños de aguas termales, Dorres destaca por sus piscinas exteriores: son antiguos lavaderos tallados directamente en bloques de granito. A poca distancia y también en esta parte de la frontera, cerca del nacimiento del río Segre, se hallan los baños de Llo, un pequeño establecimiento con piscina interior y exterior.'),
(4, 'Mercados de Navidad de España que tienes que ver', 'http://localhost:2000/images/navidad1.jpg', 'En esta entrada os hablamos de los mercados de Navidad. Si te gustan no hace falta que viajes lejos para disfrutar de ellos. En España hay un gran puñado de ellos en los que pasear...', 'http://localhost:2000/images/navidad1.jpg,http://localhost:2000/images/navidad2.jpg,http://localhost:2000/images/navidad3.jpg', 'Madrid acoge durante la época navideña un elevado número de mercados, pero el que destaca por encima de todo es el Mercado de Navidad de la Plaza Mayor. En él se pueden ver más de 100 casetas en las que se vende corcho, musgo, árboles de navidad, adornos navideños y artículos de broma y juguetes entre otros muchos elementos. Este mercado tiene su origen en el mercado de pavos, turrones y dulces que se establecía aquí durante del siglo XIX. Aunque los artículos en venta han cambiado, el espíritu es el mismo: celebrar la Navidad. Del 24 de noviembre al 31 de diciembre.(fin-parrafo)La plaza del Pilar (Zaragoza) se transforma en Navidad en una auténtica mini ciudad en la que los zaragozanos pueden disfrutar de un inmenso Belén con más de 50 figuras, una pista de patinaje y, por supuesto, un mercado de más de 40 casetas al más puro estilo europeo en el que se vende todo tipo de productos: artesanía, joyería, juguetería, ropa, decoración, gastronomía… Aún no se saben las fechas exactas, pero suele permanecer desde la primera semana de diciembre hasta la primera de enero.(fin-parrafo)El Mercado de Navidad de Valencia se sitúa alrededor de la Lonja, concretamente entre esta, la Iglesia de los Santos Juanes y el Mercado Central. Así se estableció en 2017, cuando cambió su ubicación de la Avenida del Oeste a esta. Guirnaldas, pesebres, juguetes y una gran cantidad de objetos decorativos navideños es lo que ofrecen los puestos que se instalan en este mercado navideño. Aún no se saben las fechas exactas, pero suele abrir la primera semana de diciembre y cerrar el Día de Reyes (6 de enero).');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `excursiones`
--

CREATE TABLE `excursiones` (
  `id_excursion` int(11) NOT NULL,
  `nombre_excursion` text NOT NULL,
  `url_imagen_principal` text NOT NULL,
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

INSERT INTO `excursiones` (`id_excursion`, `nombre_excursion`, `url_imagen_principal`, `fecha_inicio`, `fecha_fin`, `nivel`, `transporte`, `destino`, `hora_salida`, `hora_regreso`, `lugar_salida`, `precio`, `descripcion`, `material`, `tiempo_atmosferico`, `detalles`, `url_imagen`) VALUES
(1, 'CAMINO DE SANTIAGO', 'http://localhost:2000/images/despenalagua-destacada.jpg', '2022-11-19', '2022-11-19', 'Básico', 'Bus', 'Guadalajara', '08:00:00', '20:30:00', 'Getafe', 24, 'En un entorno privilegiado Valverde de los Arroyos, el pueblo mas bonito de la arquitectura negra de Guadalajara, nos ofrece un paisaje alpino como ningún otro. Con el Pico Ocejón como telón de fondo y característica silueta, nos hará sentir pequeños bajo su falda. Sus abruptas y verticales laderas riegan el valle con las aguas del Arroyo de la Gargantilla, Angostura y de la Chorrera antes de unirse para dar paso al Rio Sorbe.\r\nEl Arroyo de la Chorrera se precipita de manera ordenada y se desliza por la negra pizarra de la Sierra de Ayllon dando forma a la Chorrera de Despeñalagua, un capricho de la naturaleza, sin duda de sinigual belleza.(fin-parrafo)Antes de regresar a Madrid, haremos una parada en la Ermita del Enebral y la Ciudad Encantada de Tamajón, un capricho que el aire, el agua y el tiempo ha formado, dejando su huella dibujando en la roca caliza misteriosas formas y alguna que otra cueva que podremos descubrir mientras paseamos por tan singular lugar....te vienes?', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', '2°, Lluvia débil, Sensación T. 12°', 'INCLUYE: Transporte en autobús, Ruta de senderismo 8 km. nivel básico, Seguro básico accidentes/r.c.\r\nGuías', 'http://localhost:2000/images/despenalagua-destacada.jpg,http://localhost:2000/images/despenalagua-slider.jpg'),
(2, 'HOCES DEL RIAZA', 'http://localhost:2000/images/despenalagua-slider.jpg', '2022-11-20', '2022-11-20', 'Básico 12 Km', 'Bus', 'Segovia', '08:15:00', '20:00:00', 'Plaza Castilla', 25, 'Recorremos hoy las Hoces del Riaza donde el río ha excavado un espectacular cañón entre cortados de las duras rocas calizas, uno de los mayores conjuntos de hoces, cañones, acantilados y desfiladeros y parajes solitarios de gran belleza, que se pueden contemplar en el interior de la Península Ibérica.(fin-parrafo)La capital del buitre leonado es, sin duda, Montejo de la Vega de la Serrezuela, un pequeño pueblo segoviano que tiene casi más letras que habitantes, y en cuyos alrededores prosperan cultivos agrícolas al amparo de las aguas del río Riaza. Desde Montejo, que cuenta con una cooperativa consagrada a la explotación turística de la hoz, parte la pista de tierra que, a lo largo de 12 kilómetros hasta las inmediaciones del caserío amurallado de Maderuelo,  permite remontar las aguas por entre precipicios abarrotados de buitres.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', '2°, Lluvia débil, Sensación T. 12°', 'INCLUYE\r\nTransporte en autocar\r\nRuta de senderismo Puentes de la Ermita del Casuar  (12 km Nivel Básico )\r\nSeguro de accidentes/r.c.\r\nGuías.', 'http://localhost:2000/images/despenalagua-slider.jpg'),
(3, 'HOCES DEL RIAZA', 'http://localhost:2000/images/despenalagua-slider.jpg', '2022-11-20', '2022-11-20', 'Básico 12 Km', 'Bus', 'Segovia', '08:15:00', '20:00:00', 'Plaza Castilla', 25, 'Recorremos hoy las Hoces del Riaza donde el río ha excavado un espectacular cañón entre cortados de las duras rocas calizas, uno de los mayores conjuntos de hoces, cañones, acantilados y desfiladeros y parajes solitarios de gran belleza, que se pueden contemplar en el interior de la Península Ibérica.(fin-parrafo)La capital del buitre leonado es, sin duda, Montejo de la Vega de la Serrezuela, un pequeño pueblo segoviano que tiene casi más letras que habitantes, y en cuyos alrededores prosperan cultivos agrícolas al amparo de las aguas del río Riaza. Desde Montejo, que cuenta con una cooperativa consagrada a la explotación turística de la hoz, parte la pista de tierra que, a lo largo de 12 kilómetros hasta las inmediaciones del caserío amurallado de Maderuelo,  permite remontar las aguas por entre precipicios abarrotados de buitres.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', '2°, Lluvia débil, Sensación T. 12°', 'INCLUYE\r\nTransporte en autocar\r\nRuta de senderismo Puentes de la Ermita del Casuar  (12 km Nivel Básico )\r\nSeguro de accidentes/r.c.\r\nGuías.', 'http://localhost:2000/images/despenalagua-slider.jpg'),
(4, 'HOCES DEL RIAZA', 'http://localhost:2000/images/despenalagua-slider.jpg', '2022-11-20', '2022-11-20', 'Básico 12 Km', 'Bus', 'Segovia', '08:15:00', '20:00:00', 'Plaza Castilla', 25, 'Recorremos hoy las Hoces del Riaza donde el río ha excavado un espectacular cañón entre cortados de las duras rocas calizas, uno de los mayores conjuntos de hoces, cañones, acantilados y desfiladeros y parajes solitarios de gran belleza, que se pueden contemplar en el interior de la Península Ibérica.(fin-parrafo)La capital del buitre leonado es, sin duda, Montejo de la Vega de la Serrezuela, un pequeño pueblo segoviano que tiene casi más letras que habitantes, y en cuyos alrededores prosperan cultivos agrícolas al amparo de las aguas del río Riaza. Desde Montejo, que cuenta con una cooperativa consagrada a la explotación turística de la hoz, parte la pista de tierra que, a lo largo de 12 kilómetros hasta las inmediaciones del caserío amurallado de Maderuelo,  permite remontar las aguas por entre precipicios abarrotados de buitres.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', '2°, Lluvia débil, Sensación T. 12°', 'INCLUYE\r\nTransporte en autocar\r\nRuta de senderismo Puentes de la Ermita del Casuar  (12 km Nivel Básico )\r\nSeguro de accidentes/r.c.\r\nGuías.', 'http://localhost:2000/images/despenalagua-slider.jpg'),
(5, 'HOCES DEL RIAZA', 'http://localhost:2000/images/despenalagua-slider.jpg', '2022-11-20', '2022-11-20', 'Básico 12 Km', 'Bus', 'Segovia', '08:15:00', '20:00:00', 'Plaza Castilla', 25, 'Recorremos hoy las Hoces del Riaza donde el río ha excavado un espectacular cañón entre cortados de las duras rocas calizas, uno de los mayores conjuntos de hoces, cañones, acantilados y desfiladeros y parajes solitarios de gran belleza, que se pueden contemplar en el interior de la Península Ibérica.(fin-parrafo)La capital del buitre leonado es, sin duda, Montejo de la Vega de la Serrezuela, un pequeño pueblo segoviano que tiene casi más letras que habitantes, y en cuyos alrededores prosperan cultivos agrícolas al amparo de las aguas del río Riaza. Desde Montejo, que cuenta con una cooperativa consagrada a la explotación turística de la hoz, parte la pista de tierra que, a lo largo de 12 kilómetros hasta las inmediaciones del caserío amurallado de Maderuelo,  permite remontar las aguas por entre precipicios abarrotados de buitres.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', '2°, Lluvia débil, Sensación T. 12°', 'INCLUYE\r\nTransporte en autocar\r\nRuta de senderismo Puentes de la Ermita del Casuar  (12 km Nivel Básico )\r\nSeguro de accidentes/r.c.\r\nGuías.', 'http://localhost:2000/images/despenalagua-slider.jpg'),
(6, 'HOCES DEL RIAZA', 'http://localhost:2000/images/despenalagua-slider.jpg', '2022-11-20', '2022-11-20', 'Básico 12 Km', 'Bus', 'Segovia', '08:15:00', '20:00:00', 'Plaza Castilla', 25, 'Recorremos hoy las Hoces del Riaza donde el río ha excavado un espectacular cañón entre cortados de las duras rocas calizas, uno de los mayores conjuntos de hoces, cañones, acantilados y desfiladeros y parajes solitarios de gran belleza, que se pueden contemplar en el interior de la Península Ibérica.(fin-parrafo)La capital del buitre leonado es, sin duda, Montejo de la Vega de la Serrezuela, un pequeño pueblo segoviano que tiene casi más letras que habitantes, y en cuyos alrededores prosperan cultivos agrícolas al amparo de las aguas del río Riaza. Desde Montejo, que cuenta con una cooperativa consagrada a la explotación turística de la hoz, parte la pista de tierra que, a lo largo de 12 kilómetros hasta las inmediaciones del caserío amurallado de Maderuelo,  permite remontar las aguas por entre precipicios abarrotados de buitres.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', '2°, Lluvia débil, Sensación T. 12°', 'INCLUYE\r\nTransporte en autocar\r\nRuta de senderismo Puentes de la Ermita del Casuar  (12 km Nivel Básico )\r\nSeguro de accidentes/r.c.\r\nGuías.', 'http://localhost:2000/images/despenalagua-slider.jpg'),
(7, 'HOCES DEL RIAZA', 'http://localhost:2000/images/despenalagua-slider.jpg', '2022-11-20', '2022-11-20', 'Básico 12 Km', 'Bus', 'Segovia', '08:15:00', '20:00:00', 'Plaza Castilla', 25, 'Recorremos hoy las Hoces del Riaza donde el río ha excavado un espectacular cañón entre cortados de las duras rocas calizas, uno de los mayores conjuntos de hoces, cañones, acantilados y desfiladeros y parajes solitarios de gran belleza, que se pueden contemplar en el interior de la Península Ibérica.(fin-parrafo)La capital del buitre leonado es, sin duda, Montejo de la Vega de la Serrezuela, un pequeño pueblo segoviano que tiene casi más letras que habitantes, y en cuyos alrededores prosperan cultivos agrícolas al amparo de las aguas del río Riaza. Desde Montejo, que cuenta con una cooperativa consagrada a la explotación turística de la hoz, parte la pista de tierra que, a lo largo de 12 kilómetros hasta las inmediaciones del caserío amurallado de Maderuelo,  permite remontar las aguas por entre precipicios abarrotados de buitres.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', '2°, Lluvia débil, Sensación T. 12°', 'INCLUYE\r\nTransporte en autocar\r\nRuta de senderismo Puentes de la Ermita del Casuar  (12 km Nivel Básico )\r\nSeguro de accidentes/r.c.\r\nGuías.', 'http://localhost:2000/images/despenalagua-slider.jpg');

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
(1, 'administrador@excursionesibice.com', 'holamundo', 'administrador', 'ADMINISTRADOR', 'admin'),
(2, 'usuario@excursionesibice.com', 'holamundo', 'usuarioprueba', 'usuario', 'usuario');

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
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `excursiones`
--
ALTER TABLE `excursiones`
  MODIFY `id_excursion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
