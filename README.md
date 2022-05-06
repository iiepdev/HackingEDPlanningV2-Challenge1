# HackingEDPlanningV2-Challenge1

<a href="http://www.youtube.com/watch?feature=player_embedded&v=7fkAELDEIaY" target="_blank"><img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F237802049%2F336870561013%2F1%2Foriginal.20220228-102209?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C54%2C1200%2C600&s=92cc71cae0ff03ed75357a1f0aef9819" 
alt="Introductory video" width="720" height="360" border="10" /></a>

🇫🇷 [Version française](#version-française)

🇪🇸 [Versión en Español](#versi%C3%B3n-en-espa%C3%B1ol)

Note: By accessing this repository and the corresponding files, you agree to a [non-disclosure agreement](https://box.iiep.unesco.org/s/FCXnZCStwRcyge4). You can also access the [Challenge brief](https://box.iiep.unesco.org/s/xJYAjtLTrCzWf5q)

🧐 Flooding  can severely disrupt access to education in many countries, affecting especially developing countries in the global south. Most Ministries of Education don’t have the technical know-how to obtain detailed climate-related statistics with an emphasis on education infrastructure.

🎯 The  objective of this challenge is to develop a code that uses remote sensing and historical data to determine the frequency and extent of flooding around schools for a particular region or country. It should extract which schools were flooded by date, the proportion of the area that was flooded around the school, and the duration of this flood.

This information will be instrumental in helping Ministries of Education in knowing which schools to refurbish, and where to set in place additional policies that can guarantee that kids can still make it to school, even during the rainy season.

⛑ Participants are encouraged to use GEE or its Python API to create these series.

# Data

While all flooding data needs to be extracted from GEE, the layer of school locations needs to be manually loaded into the GEE instance. The point layer with the school characteristics is freely available information from Myanmar, for the [upper](https://data.humdata.org/dataset/mimu-geonode-formal-sector-school-location-upper-myanmar) and [lower](https://data.humdata.org/dataset/mimu-geonode-formal-sector-school-location-lower-myanmar) areas in the country.

## Flooded areas

Different image collections exist within GEE to obtain flooding patterns. Below is a non-exhaustive list.

|Name of the data source|Frequency|Time span|Resolution|Code|
|:----|:----|:----|:----|:----|
|Sentinel-1 SAR GRD|Daily|2014-Present|10 meters|[Sentinel-1 SAR GRD](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S1_GRD)|
|Global Flood Database v1|Daily|2000-2018|30 meters|[Global Flood Database](https://developers.google.com/earth-engine/datasets/catalog/GLOBAL_FLOOD_DB_MODIS_EVENTS_V1)|
|JRC Monthly Water History, v1.3|Monthly|1984-2020|30 meters|[JRC Monthly Water History](https://developers.google.cn/earth-engine/datasets/catalog/JRC_GSW1_3_MonthlyHistory)|

# Useful tutorials

A number of free, online resources exist on flood detection with GEE. A particularly good one, which can guide the construction of a custom code for flood detection, can be found here:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=jYsK9Y4ICrY" target="_blank"><img src="http://img.youtube.com/vi/jYsK9Y4ICrY/0.jpg" 
alt="Flood Mapping" width="480" height="360" border="10" /></a>

Another useful tutorial is on how to extract time series from GEE:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=LqSClCXrMl4" target="_blank"><img src="http://img.youtube.com/vi/LqSClCXrMl4/0.jpg" 
alt="Flood Mapping" width="480" height="360" border="10" /></a>

# Aditional resources

- [Accessing Google Earth Engine](https://code.earthengine.google.com)
- [Earth Engine Catalog](https://developers.google.com/earth-engine/datasets)
- [End-to-End GEE course](https://courses.spatialthoughts.com/end-to-end-gee.html)
- [The GEE Python API](https://developers.google.com/earth-engine/tutorials/community/intro-to-python-api)

# How to use this GitHub repository ? 

If you have never used github repository you can download the content of this repository by clicking on the button **Code** and then **download zip**. If you want you can start to use github by forking this project as a base for your project and share your work on Github. 

![image](https://user-images.githubusercontent.com/20289907/165938434-c12486a7-b9ae-43e8-81f2-0e15e279bfd3.png)

# Version Française

Note : En accédant à ce dépôt et aux fichiers correspondants, vous acceptez un [accord de non-divulgation des données confidentielles](https://box.iiep.unesco.org/s/cLG4mAXLWeJyFWT). Vous pouvez également accéder au [Résumé du défi](https://box.iiep.unesco.org/s/xJYAjtLTrCzWf5q)

🧐 Dans de nombreux pays, les inondations peuvent gravement perturber l'accès à l'éducation. De nombreux ministères de l'éducation sont confrontés à des difficultés lorsqu'il s'agit d'obtenir des données détaillées sur le climat et de les utiliser combinées aux informations et statistiques liées à l'éducation.

🎯 L'objectif de ce défi est de développer un code qui utilise la télédétection et les données historiques pour déterminer la fréquence et l'étendue des inondations autour des écoles pour une région ou un pays particulier. Le code doit extraire les écoles qui ont été inondées par date, la proportion de la zone autour de l'école qui a été inondée, et la durée de l'inondation.

Ces informations seraient utiles pour aider les ministères de l'éducation à décider quelles écoles ré-nover en priorité, et où mettre en place des politiques supplémentaires pour garantir que les enfants puissent se rendre à l'école, même pendant la saison des pluies.

⛑ Les participants sont encouragés à utiliser Google Earth Engine ou son API Python pour créer ces séries.

# Données

Alors que toutes les données sur les inondations doivent être extraites de GEE, la couche des emplacements des écoles doit être chargée manuellement dans l'instance GEE. La couche de points contenant les caractéristiques des écoles est une information librement disponible au Myanmar, pour les zones géographiques [supérieures](https://data.humdata.org/dataset/mimu-geonode-formal-sector-school-location-upper-myanmar) et [inférieures](https://data.humdata.org/dataset/mimu-geonode-formal-sector-school-location-lower-myanmar) du pays.

## Zones inondées

Différentes collections d'images existent au sein de GEE pour obtenir des modèles d'inondation. En voici une liste non exhaustive.

|Nom de la source de données|Fréquence|Période de temps|Résolution|Code|
|:----|:----|:----|:----|:----|
|Sentinel-1 SAR GRD|Quotidiennement|2014-présent|10 mètres|[Sentinel-1 SAR GRD](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S1_GRD)|
|GBase de données mondiale sur les inondations  v1|Quotidiennement|2000-2018|30 mètres|[Global Flood Database](https://developers.google.com/earth-engine/datasets/catalog/GLOBAL_FLOOD_DB_MODIS_EVENTS_V1)|
|Historique mensuel de l'eau du CCR, v1.3|Mensuel|1984-2020|30 mètres|[JRC Monthly Water History](https://developers.google.cn/earth-engine/datasets/catalog/JRC_GSW1_3_MonthlyHistory)|

# Tutoriels utiles

Il existe un certain nombre de ressources gratuites en ligne sur la détection des inondations avec GEE. Une ressource particulièrement bonne, qui peut guider la construction d'un code personnalisé pour la détection des inondations, peut être trouvée ici :

<a href="http://www.youtube.com/watch?feature=player_embedded&v=jYsK9Y4ICrY" target="_blank"><img src="http://img.youtube.com/vi/jYsK9Y4ICrY/0.jpg" 
alt="Flood Mapping" width="480" height="360" border="10" /></a>

Un autre tutoriel utile porte sur la manière d'extraire des séries chronologiques à partir de GEE :

<a href="http://www.youtube.com/watch?feature=player_embedded&v=LqSClCXrMl4" target="_blank"><img src="http://img.youtube.com/vi/LqSClCXrMl4/0.jpg" 
alt="Flood Mapping" width="480" height="360" border="10" /></a>

# Ressources supplémentaires

- [Accéder au moteur Google Earth](https://code.earthengine.google.com)
- [Catalogue de Earth Engine](https://developers.google.com/earth-engine/datasets)
- [Cours GEE de bout en bout](https://courses.spatialthoughts.com/end-to-end-gee.html)
- [L'API Python de GEE](https://developers.google.com/earth-engine/tutorials/community/intro-to-python-api)

# Comment utiliser ce dépôt GitHub ?

Si vous n'avez jamais utilisé le dépôt GitHub, vous pouvez télécharger le contenu de ce dépôt en cliquant sur le bouton **Code** et ensuite **télécharger zip**. Si vous voulez, vous pouvez commencer à utiliser GitHub en forkant ce projet comme base pour votre projet et partager votre travail sur GitHub.

![image](https://user-images.githubusercontent.com/20289907/165938434-c12486a7-b9ae-43e8-81f2-0e15e279bfd3.png)

# Versión en Español

Nota: Al acceder a este repositorio y a los archivos correspondientes, usted acepta un [acuerdo de no divulgación](https://box.iiep.unesco.org/s/5NdS4nR2dinDbRY). También puede acceder al [Informe del Desafío](https://box.iiep.unesco.org/s/xJYAjtLTrCzWf5q)

🧐 En muchos países, las inundaciones pueden interrumpir gravemente el acceso a la educación. Muchos ministerios de educación se enfrentan a desafíos para obtener datos climáticos precisos y cruzarlos con estadísticas educativas e información sobre la infraestructura educativa del país.

🎯 El objetivo de este reto es desarrollar un código que utilice la teledetección y los datos históricos para determinar la frecuencia y el alcance de las inundaciones en torno a las escuelas de una región o de un país determinados. El código debe extraer qué escuelas se han inundado y en qué fecha, la proporción del área inundada alrededor de la escuela y la duración de la inundación.

Esta información sería fundamental para apoyar las decisiones de los ministerios de educación a la hora de identificar las escuelas que deben ser renovadas en prioridad, así como para establecer políticas adicionales que garanticen que las niñas y los niños puedan seguir asistiendo a la escuela, incluso durante las temporadas más lluviosas.

⛑ Se anima a las/os participantes a utilizar Google Earth Engine o su API de Python para abordar este desafío.

# Datos

Mientras que los datos sobre inundaciones deben extraerse de GEE, la capa de las ubicaciones de las escuelas debe cargarse manualmente en la instancia de GEE. La capa de puntos con las características de las escuelas es información disponible libremente en Myanmar, para las zonas [altas](https://data.humdata.org/dataset/mimu-geonode-formal-sector-school-location-upper-myanmar) y [bajas](https://data.humdata.org/dataset/mimu-geonode-formal-sector-school-location-lower-myanmar) del país.

# Zonas inundadas

Existen diferentes colecciones de imágenes dentro de GEE para obtener patrones de inundación. A continuación se presenta una lista no exhaustiva.

|Nombre de la fuente de datos|Frecuencia|Periodo de tiempo|Resolución|Código|
|:----|:----|:----|:----|:----|
|Sentinel-1 SAR GRD|Diaria|2014-Presente|10 metros|[Sentinel-1 SAR GRD](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S1_GRD)|
|Base de datos mundial sobre inundaciones v1|Diaria|2000-2018|30 metros|[Global Flood Database](https://developers.google.com/earth-engine/datasets/catalog/GLOBAL_FLOOD_DB_MODIS_EVENTS_V1)|
|Historia mensual del agua del CCI, v1.3|Mensual|1984-2020|30 metros|[JRC Monthly Water History](https://developers.google.cn/earth-engine/datasets/catalog/JRC_GSW1_3_MonthlyHistory)|

# Tutoriales útiles

Existen varios recursos gratuitos en línea sobre la detección de inundaciones con GEE. Uno particularmente bueno, que puede guiar la construcción de un código personalizado para la detección de inundaciones, se puede encontrar aquí:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=jYsK9Y4ICrY" target="_blank"><img src="http://img.youtube.com/vi/jYsK9Y4ICrY/0.jpg" 
alt="Flood Mapping" width="480" height="360" border="10" /></a>

Otro tutorial útil es sobre cómo extraer series temporales de GEE:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=LqSClCXrMl4" target="_blank"><img src="http://img.youtube.com/vi/LqSClCXrMl4/0.jpg" 
alt="Flood Mapping" width="480" height="360" border="10" /></a>

# Recursos adicionales

- [Acceso al motor de Google Earth](https://code.earthengine.google.com/)
-	[Catálogo de Earth Engine](https://developers.google.com/earth-engine/datasets)
-	[Curso de GEE de principio a fin](https://courses.spatialthoughts.com/end-to-end-gee.html)
-	[La API de GEE Python](https://developers.google.com/earth-engine/tutorials/community/intro-to-python-api)

# ¿Cómo utilizar este repositorio de GitHub?

Si nunca ha utilizado el repositorio de GitHub, puede descargar el contenido de este repositorio haciendo clic en el botón **Código** y luego **descargar el zip**. Si así lo desea, puede empezar a usar GitHub bifurcando este proyecto como base para su proyecto y compartir su trabajo en GitHub.
 
![image](https://user-images.githubusercontent.com/20289907/165938434-c12486a7-b9ae-43e8-81f2-0e15e279bfd3.png)
