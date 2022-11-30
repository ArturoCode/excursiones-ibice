-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 29-11-2022 a las 22:52:22
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
(4, 'Mercados de Navidad de España que tienes que ver', 'http://localhost:2000/images/navidad1.jpg', 'En esta entrada os hablamos de los mercados de Navidad. Si te gustan no hace falta que viajes lejos para disfrutar de ellos. En España hay un gran puñado de ellos en los que pasear...', 'http://localhost:2000/images/navidad1.jpg,http://localhost:2000/images/navidad2.jpg,http://localhost:2000/images/navidad3.jpg', 'Madrid acoge durante la época navideña un elevado número de mercados, pero el que destaca por encima de todo es el Mercado de Navidad de la Plaza Mayor. En él se pueden ver más de 100 casetas en las que se vende corcho, musgo, árboles de navidad, adornos navideños y artículos de broma y juguetes entre otros muchos elementos. Este mercado tiene su origen en el mercado de pavos, turrones y dulces que se establecía aquí durante del siglo XIX. Aunque los artículos en venta han cambiado, el espíritu es el mismo: celebrar la Navidad. Del 24 de noviembre al 31 de diciembre.(fin-parrafo)La plaza del Pilar (Zaragoza) se transforma en Navidad en una auténtica mini ciudad en la que los zaragozanos pueden disfrutar de un inmenso Belén con más de 50 figuras, una pista de patinaje y, por supuesto, un mercado de más de 40 casetas al más puro estilo europeo en el que se vende todo tipo de productos: artesanía, joyería, juguetería, ropa, decoración, gastronomía… Aún no se saben las fechas exactas, pero suele permanecer desde la primera semana de diciembre hasta la primera de enero.(fin-parrafo)El Mercado de Navidad de Valencia se sitúa alrededor de la Lonja, concretamente entre esta, la Iglesia de los Santos Juanes y el Mercado Central. Así se estableció en 2017, cuando cambió su ubicación de la Avenida del Oeste a esta. Guirnaldas, pesebres, juguetes y una gran cantidad de objetos decorativos navideños es lo que ofrecen los puestos que se instalan en este mercado navideño. Aún no se saben las fechas exactas, pero suele abrir la primera semana de diciembre y cerrar el Día de Reyes (6 de enero).'),
(9, 'Mercados mod', 'http://localhost:2000/images/navidad1.jpg', 'En esta entrada os hablamos de los mercados de Navidad. Si te gustan no hace falta que viajes lejos para disfrutar de ellos. En España hay un gran puñado de ellos en los que pasear...', 'http://localhost:2000/images/navidad1.jpg,http://localhost:2000/images/navidad2.jpg,http://localhost:2000/images/navidad3.jpg', 'Madrid acoge durante la época navideña un elevado número de mercados, pero el que destaca por encima de todo es el Mercado de Navidad de la Plaza Mayor. En él se pueden ver más de 100 casetas en las que se vende corcho, musgo, árboles de navidad, adornos navideños y artículos de broma y juguetes entre otros muchos elementos. Este mercado tiene su origen en el mercado de pavos, turrones y dulces que se establecía aquí durante del siglo XIX. Aunque los artículos en venta han cambiado, el espíritu es el mismo: celebrar la Navidad. Del 24 de noviembre al 31 de diciembre.(fin-parrafo)La plaza del Pilar (Zaragoza) se transforma en Navidad en una auténtica mini ciudad en la que los zaragozanos pueden disfrutar de un inmenso Belén con más de 50 figuras, una pista de patinaje y, por supuesto, un mercado de más de 40 casetas al más puro estilo europeo en el que se vende todo tipo de productos: artesanía, joyería, juguetería, ropa, decoración, gastronomía… Aún no se saben las fechas exactas, pero suele permanecer desde la primera semana de diciembre hasta la primera de enero.(fin-parrafo)El Mercado de Navidad de Valencia se sitúa alrededor de la Lonja, concretamente entre esta, la Iglesia de los Santos Juanes y el Mercado Central. Así se estableció en 2017, cuando cambió su ubicación de la Avenida del Oeste a esta. Guirnaldas, pesebres, juguetes y una gran cantidad de objetos decorativos navideños es lo que ofrecen los puestos que se instalan en este mercado navideño. Aún no se saben las fechas exactas, pero suele abrir la primera semana de diciembre y cerrar el Día de Reyes (6 de enero).');

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
(1, 'CAMINO DE SANTIAGO', 'http://localhost:2000/images/santiago1.jpg', '2022-10-09', '2022-10-15', 'Medio', 'Bus', 'A Coruña', '16:00:00', '22:00:00', 'Madrid', 350, 'Camino de Santiago es la denominación que tiene un conjunto de rutas de peregrinación cristiana de origen medieval que se dirigen a la tumba de Santiago el Mayor, situada en la catedral de Santiago de Compostela. Para las personas cristianas, la culminación llega cuando acceden al templo donde se veneran los restos de un apóstol y en el que, con la sencillez adquirida durante las jornadas de peregrinación, rezan por todo lo que les importa en la vida. Las Las personas no creyentes se sienten asimismo atraídas por la experiencia espiritual que supone «hacer el Camino» (fin-parrafo)El Camino esta completamente señalizado y balizado con flechas amarillas y carteles indicadores, por lo que no hay problema de perderse. El programa propuesto puede estar sujeto a cambios por causas meteorológicas, logística, por seguridad del grupo, consejo del guía o por cualquier otra circustancia que aconseje modificar horarios, itinerarios o actividades previstas.', 'Calzado apropiado (botas ligeras o similares), varios calcetines mullidos, recipiente para agua, cremas protección, equipo de lluvia y ropa de abrigo. Es interesante una máquina de fotos y un teléfono móvil, que pueden ir en una mochila pequeña o riñonera para llevar la máquina de fotos, ropa de mano, crema de protección solar. Conviene llevar una mínima preparación andando lo más que se pueda.', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte desde Madrid y regreso. Alojamiento en Hoteles en habitación con baño propio. Desayunos y cenas. Seguro de accidentes. Guía acompañante', 'http://localhost:2000/images/santiago1.jpg,http://localhost:2000/images/santiago2.jpg'),
(2, 'RUTA DEL CARES', 'http://localhost:2000/images/cares1.jpg', '2022-09-01', '2022-09-05', 'Medio', 'Bus', 'Asturias', '07:00:00', '22:00:00', 'Getafe', 210, 'Esta inigualable y famosa ruta comienza en el pueblo de Poncebos, entrando en dirección Sudeste. Conocida como la Garganta Divina, la ruta del Cares nos empequeñece, nos fascina, nos abruma con sus paisajes de roca, sus árboles en lugares imposibles, sus riscos casi inaccesibles, la profundidad del valle excavado por las verdes y cristalinas aguas del río Cares, bajo la atenta mirada del Picu Urriellu (Naranjo de Bulnes), que con suerte veremos al comienzo de la ruta, en la zona de Poncebos.(fin-parrafo) Un canal de la central hidroeléctrica nos acompaña todo el camino; esto hace fácil caminar entre estas impresionantes montañas casi en el fondo de esta brecha rocosa de algo más de 2.000 metros de profundidad. Merece la pena realizar la ruta a paso tranquilo, parando de vez en cuando para disfrutar de la grandiosidad de este paisaje único. No obstante, el Cares nos obliga a extremar las precauciones, a estar pendientes de las posibles piedras que caen, así como al hecho de estar caminando al borde de un precipicio de manera continua sin barandilla.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua. También kit de playa (bañador, toalla, chanclas, protector solar, por si existe la posibilidad de baño en playa).', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte en autocar. Rutas de senderismo descritas en el itinerario. Alojamiento en un hotel rural en habitación doble. Ccenas y desayunos. Seguro de accidentes y Guías', 'http://localhost:2000/images/cares1.jpg,http://localhost:2000/images/cares1.jpg'),
(3, 'COSTA BRAVA', 'http://localhost:2000/images/brava1.jpg', '2022-12-07', '2022-12-10', 'Básico', 'Bus', 'Gerona', '07:00:00', '21:00:00', 'Fuencarral', 320, 'La Costa Brava es el nombre asignado a la zona costera de España que comienza en Blanes y acaba en la frontera con Francia, en Portbou. Limita al norte con la Costa Vermella y al sur con la Costa del Maresme.(fin-parrafo)«Costa brava» es, desde tiempo inmemorial, una locución propia de gente de mar. En los medios marineros se llamaba y se llama costa brava a toda costa abrupta y rocosa, de características análogas a la costa de Mallorca pero en la gerundense. El nombre quizás carece de raíz popular, pero es de origen marinero y, en la costa catalana y en el siglo decimonono, ésta es una forma de raíz popular.', 'Llevar comida y agua de casa para la excursión del primer día, calzado de senderismo y siempre sea verano o invierno, llevar en la mochila un chubasquero o capa de agua.', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte en autocar. Alojamiento en hotel. Cenas y desayunos. Rutas de senderismo. Seguro de accidentes y Guías.', 'http://localhost:2000/images/brava1.jpg,http://localhost:2000/images/brava2.jpg'),
(4, 'LAGUNA GRANDE', 'http://localhost:2000/images/gredos1.jpeg', '2022-10-16', '2022-10-19', 'Básico', 'Bus', 'Gredos', '08:15:00', '20:00:00', 'Madrid', 250, 'La ruta a la Laguna Grande de Gredos desde la Plataforma es sin lugar a dudas la más realizada entre la multitud de travesías que puedes realizar en esta zona de Ávila y compite en belleza con la de la Laguna Grande de Peñalara. Se trata de una caminata de exigencia moderada pero muy bien señalizada en la que compartirás experiencia con un buen número de montañeros, especialmente en fines de semana y festivos.(fin-parrafo)La Plataforma pertenece al término municipal de San Juan de Gredos y es un área de aparcamiento que se encuentra a los pies del camino por el que te adentras en el Parque Regional de la Sierra de Gredos. La forma más habitual para llegar es desde Hoyos del Espino tomando la carretera AV-931 durante 12 kilómetros, aunque también se puede acceder desde el municipio de Navacepeda de Tormes.', 'Es importante llevar un buen calzado de montaña. No olvides portar algo de comida y agua (aunque en la ruta encontrarás dos fuentes). Un pequeño kit de emergencia en caso de accidente tampoco viene mal.', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte desde Madrid y regreso. Desayunos y cenas. Seguro de accidentes. Guía acompañante', 'http://localhost:2000/images/gredos1.jpeg,http://localhost:2000/images/gredos2.jpeg'),
(5, 'RIBA DE SANTIUSTE', 'http://localhost:2000/images/santi1.jpg', '2022-10-31', '2022-11-01', 'Básico', 'Bus', 'Sigüenza', '08:15:00', '20:00:00', 'Madrid', 75, 'Un clásico entre los castillos montanos: encaramado en lo alto de un cerro innacesible, y en un excelente estado, por su relativamente reciente restauración. Su fortaleza es notable: el asedio debía llevarse a cabo cercando el cerro, y no la propia fortaleza, debido a la gran pendiente de las laderas. Por su características y disposición, debió ser erigido entre los siglos XII y XIII.(fin-parrafo)La primera noticia del castillo se tiene en tiempos del rey Alfonso VI, en el s. XII, cuando dona al obispo de Sigüenza D. Bernardo de Agén el castillo de Santiuste y la villa de la Rippa en sus inmediaciones. En el siglo XV fue tomado al asalto por las fuerzas navarras, usándolo como base de operaciones para saquear Sigüenza y su tierra. Su obispo Luján encargó al deán López de Madrid que lo recuperara, cosa que consiguió tras un asedio de cinco meses. En el s. XIX las tropas francesas lo volarían durante la Guerra de la Independencia para que no sirviese de refugio a los guerrilleros.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte desde Madrid y regreso. Alojamiento en Hoteles en habitación con baño propio. Desayunos y cenas. Guía acompañante', 'http://localhost:2000/images/santi1.jpg, http://localhost:2000/images/santi2.jpg'),
(6, 'SIERRA DE CAZORLA', 'http://localhost:2000/images/cazorla1.jpeg', '2022-11-20', '2022-11-20', 'Intermedio', 'Bus', 'Jaén', '08:15:00', '20:00:00', 'Madrid', 185, 'Pocos sitios hay en España como la Sierra de Cazorla en los que tengas tantas cosas que hacer en plena naturaleza. Y es que este parque natural de Andalucía tiene una diversidad impresionante.(fin-parrafo)Estamos hablando nada mas y nada menos que del parque natural más grande de España y el segundo de Europa. La unión de las Sierras de Cazorla, Segura y Las Villas conforman un auténtico santuario ecológico donde se pueden ver multitud de especies animales, sobre todo aves rapaces y grandes mamíferos. Pero además de naturaleza, sus pueblos han tenido gran importancia histórica.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte desde Madrid y regreso. Alojamiento en Hoteles en habitación con baño propio. Desayunos y cenas. Seguro de accidentes. Guía acompañante', 'http://localhost:2000/images/cazorla1.jpeg,http://localhost:2000/images/cazorla2.jpeg'),
(7, 'BARDENAS REALES', 'http://localhost:2000/images/bardenas1.jpeg', '2022-12-04', '2022-12-06', 'Básico', 'Bus', 'Navarra', '08:15:00', '20:00:00', 'Madrid', 120, 'Sus formas le han convertido en uno de los desiertos mas bonitos del norte de España. Tras entrar en el parque lo primero que nos encontramos es una base militar con una enorme antena militar. Momento en el que se termina la pista asfaltada y desde aquí será todo tierra hasta el final. Desde este punto ya comenzamos a ver las siluetas de las montañas arenosas del desierto de las Bardenas.(fin-parrafo)Se puede entrar a las Bardenas Reales desde muchos lugares diferentes pero quizás desde la localidad de Arguedas sea la mejor opción, además de estar el centro de interpretación en la carretera de entrada al parque. La mejor época del año para visitar las Bardenas Reales comienza desde Octubre hasta Junio, evitando los meses más calurosos.', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte desde Madrid y regreso. Alojamiento en Hoteles en habitación con baño propio. Desayunos y cenas. Seguro de accidentes. Guía acompañante', 'http://localhost:2000/images/bardenas1.jpeg, http://localhost:2000/images/bardenas2.jpeg'),
(8, 'CATEDRAL DEL SALVADOR', 'http://localhost:2000/images/salvador1.jpg', '2022-09-08', '2022-09-10', 'Básico', 'Bus', 'Ávila', '08:15:00', '20:00:00', 'Madrid', 80, 'La catedral de Cristo Salvador es un templo de culto católico de la ciudad española de Ávila, sede episcopal del mismo nombre, en Castilla y León. Fue proyectada como templo y fortaleza, siendo su ábside uno de los cubos de la muralla de la ciudad. Está considerada como la primera catedral gótica de España. La planta posee influencias francesas y cierta semejanza con la basílica de Saint-Denis, la primera iglesia gótica.(fin-parrafo)Está rodeada de varias casas o palacios señoriales, siendo los más importantes el de los Velada, el del Rey Niño y el de Valderrábanos, los cuales tenían asignada la defensa de La Puerta de los Leales o del Peso de la Harina. Se cree que Fruchel construyó la parte más antigua de la catedral, la correspondiente a la cabecera, mientras que el cuerpo de naves, las capillas adyacentes y el remate de las torres, serían fruto de las sucesivas obras entre los siglos XIII y XVI. ', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte desde Madrid y regreso. Alojamiento en Hoteles en habitación con baño propio. Desayunos y cenas. Seguro de accidentes. Guía acompañante', 'http://localhost:2000/images/salvador1.jpg,http://localhost:2000/images/salvador2.jpg'),
(17, 'CATEDRAL MOD', 'http://localhost:2000/images/salvador1.jpg', '2022-09-05', '2022-09-07', 'Básico', 'Bus', 'Ávila', '08:15:00', '20:00:00', 'Madrid', 80, 'La catedral de Cristo Salvador es un templo de culto católico de la ciudad española de Ávila, sede episcopal del mismo nombre, en Castilla y León. Fue proyectada como templo y fortaleza, siendo su ábside uno de los cubos de la muralla de la ciudad. Está considerada como la primera catedral gótica de España. La planta posee influencias francesas y cierta semejanza con la basílica de Saint-Denis, la primera iglesia gótica.(fin-parrafo)Está rodeada de varias casas o palacios señoriales, siendo los más importantes el de los Velada, el del Rey Niño y el de Valderrábanos, los cuales tenían asignada la defensa de La Puerta de los Leales o del Peso de la Harina. Se cree que Fruchel construyó la parte más antigua de la catedral, la correspondiente a la cabecera, mientras que el cuerpo de naves, las capillas adyacentes y el remate de las torres, serían fruto de las sucesivas obras entre los siglos XIII y XVI. ', 'Llevar mochila y calzado de senderismo, chubasquero o capa de agua.', 'Puede variar, recomendamos llevar equipamiento adecuado', 'INCLUYE: Transporte desde Madrid y regreso. Alojamiento en Hoteles en habitación con baño propio. Desayunos y cenas. Seguro de accidentes. Guía acompañante', 'http://localhost:2000/images/salvador1.jpg,http://localhost:2000/images/salvador2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `excursiones_guardadas`
--

CREATE TABLE `excursiones_guardadas` (
  `id_usuario` int(11) NOT NULL,
  `id_excursion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `excursiones_guardadas`
--

INSERT INTO `excursiones_guardadas` (`id_usuario`, `id_excursion`) VALUES
(5, 3),
(5, 5),
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(6, 6),
(7, 1),
(7, 2),
(7, 4),
(9, 2),
(9, 4),
(9, 6),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(11, 5),
(11, 6),
(11, 8),
(12, 2),
(12, 4),
(12, 6),
(13, 1),
(13, 2),
(13, 3),
(13, 4),
(13, 5),
(13, 6),
(13, 7),
(13, 8),
(13, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `excursiones_hechas`
--

CREATE TABLE `excursiones_hechas` (
  `id_usuario` int(11) NOT NULL,
  `id_excursion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `excursiones_hechas`
--

INSERT INTO `excursiones_hechas` (`id_usuario`, `id_excursion`) VALUES
(5, 1),
(5, 2),
(5, 4),
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(6, 6),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(9, 1),
(9, 3),
(9, 5),
(11, 1),
(11, 3),
(11, 5),
(11, 8),
(12, 1),
(12, 3),
(12, 5),
(13, 1),
(13, 3),
(13, 4),
(13, 5),
(13, 6),
(13, 7),
(13, 8),
(13, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('FXKEMt61fD1ONfmApLT97e0B3F9Gd3Hi', 1674751745, '{\"cookie\":{\"originalMaxAge\":5183999999,\"expires\":\"2023-01-26T12:50:16.692Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":5,\"nombre\":\"IÑIGO\",\"email\":\"inigo@gmail.com\",\"rol\":\"usuario\"}}'),
('XNOnSfHjPNvU2bKTYwfYScZUvA0d4TYX', 1674942160, '{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2023-01-28T21:42:11.772Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":13,\"nombre\":\"flights-dreamer\",\"email\":\"flightsofadreamer@gmail.com\",\"rol\":\"usuario\"}}'),
('u_Lv2sB9aAsB0_tDFJs8psvO7-5Qcwoy', 1674870913, '{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2023-01-28T01:50:24.076Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":7,\"nombre\":\"arturo\",\"email\":\"arturocodedev@gmail.com\",\"rol\":\"usuario\"}}'),
('wsI741boYHhFAehnrovOwFaFaD9PtUIw', 1674758096, '{\"cookie\":{\"originalMaxAge\":5184000000,\"expires\":\"2023-01-26T18:31:40.644Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":7,\"nombre\":\"arturourbanos\",\"email\":\"arturocodedev@gmail.com\",\"rol\":\"usuario\"}}');

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
  `tipo_usuario` text NOT NULL DEFAULT 'usuario',
  `reset_password_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `password`, `nombre_usuario`, `membresia`, `tipo_usuario`, `reset_password_token`) VALUES
(1, 'excursionesibice@gmail.com', '$2b$12$aSQdglwQcQtVXNsV4qz7Revx5jBck4IvUfTelChH1EywinvueIc36', 'administrador', 'ADMINISTRADOR', 'admin', ''),
(2, 'usuario@excursionesibice.com', 'holamundo', 'usuarioprueba', 'usuario', 'usuario', ''),
(4, 'rober@gmail.com', '$2b$12$ofivKJ.Qv4NOEWK8g5WADunYgO38cfIUJqOjqgMmSMVz6UnN.b/cy', 'rober', 'usuario', 'usuario', ''),
(5, 'inigo@gmail.com', '$2b$12$K8O3g516pYDI46ezVL/49.HR8WgA1cEVNoQbruLSHhON27EjGD4ue', 'IÑIGO', 'usuario', 'usuario', ''),
(6, 'alex@gmail.com', '$2b$12$RFtGOd8j6sGXs/iFac0w.u5B2okENj9.KCPWmCJIpFTXOTzJGp/ha', 'alex', 'usuario', 'usuario', ''),
(7, 'arturocodedev@gmail.com', '$2b$12$/cnDgIPDUQXbe/FlaIkaZOKM9g5NqSeso4aLw.qoGnpkfojW24/oe', 'arturo', 'usuario', 'usuario', ''),
(8, 'hola@excursionesibice.com', '$2b$12$12H93nV3i4arVyglcfXpz.ZMeZHIHqzHmnqgLV9C.4zawRjqXoQnW', 'ibice-admin', 'ADMINISTRADOR', 'admin', ''),
(9, 'prueba@mail.com', '$2b$12$SY8rq2r3vkbUTau0SXP0E.tt.CdCI4UhdeMY6294syRUolmsPRYRm', 'prueba', 'usuario', 'usuario', ''),
(10, 'pruebafinal@mail.com', '$2b$12$c/ViPoi9ZDNUSPHawr/XmuTzI2RS3tFPr9SA5GAxuJuSPG4T44PNO', 'pruebafinal', 'usuario', 'usuario', ''),
(11, 'prueba-ibice@mail.com', '$2b$12$L/A38H609FjiwsAst3nwr.Yn1tKjNQcGP03R1gveejf41TKns1yUG', 'prueba-ibice', 'usuario', 'usuario', 'A'),
(12, 'arturourbanosv@gmail.com', '$2b$12$8cgrX3X7hDYa5ynOTcPzP.P3QAoiS1tG/Hwh2hgMpAQXv9uIJQq2C', 'prueba-arturo', 'usuario', 'usuario', ''),
(13, 'flightsofadreamer@gmail.com', '$2b$12$QepZ/3pWQEUNdaqYOHdl1.fn8L4.vV.cgSCp5h8Kq1.sBJDU7/q4a', 'flights-dreamer', 'usuario', 'usuario', '');

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
-- Indices de la tabla `excursiones_guardadas`
--
ALTER TABLE `excursiones_guardadas`
  ADD KEY `INDEX ID_EXCURSION` (`id_usuario`,`id_excursion`),
  ADD KEY `FOREIGN EXCURSION` (`id_excursion`);

--
-- Indices de la tabla `excursiones_hechas`
--
ALTER TABLE `excursiones_hechas`
  ADD KEY `FOREIGN KEY USUARIOS-EXCURSION` (`id_usuario`,`id_excursion`),
  ADD KEY `FOREIGN KEY EXCURSION` (`id_excursion`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`,`nombre_usuario`) USING HASH;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blog`
--
ALTER TABLE `blog`
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `excursiones`
--
ALTER TABLE `excursiones`
  MODIFY `id_excursion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `excursiones_guardadas`
--
ALTER TABLE `excursiones_guardadas`
  ADD CONSTRAINT `FOREIGN EXCURSION` FOREIGN KEY (`id_excursion`) REFERENCES `excursiones` (`id_excursion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FOREIGN USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `excursiones_hechas`
--
ALTER TABLE `excursiones_hechas`
  ADD CONSTRAINT `FOREIGN KEY EXCURSION` FOREIGN KEY (`id_excursion`) REFERENCES `excursiones` (`id_excursion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FOREIGN KEY USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
