# HackingEDPlanningV2-Challenge1

Flooding  can severely disrupt access to education in many countries, affecting especially developing countries in the global south. Most Ministries of Education don’t have the technical know-how to obtain detailed climate-related statistics with an emphasis on education infrastructure.
The  objective of this challenge is to develop a code that uses remote sensing and historical data to determine the frequency and extent of flooding around schools for a particular region or country. It should extract which schools were flooded by date, the proportion of the area that was flooded around the school, and the duration of this flood. Participants are encouraged to use GEE or its Python API to create these series.
This information will be instrumental in helping Ministries of Education in knowing which schools to refurbish, and where to set in place additional policies that can guarantee that kids can still make it to school, even during the rainy season. 

# Data

While all flooding data needs to be extracted from GEE, the layer of school locations needs to be manually loaded into the GEE instance. The point layer with the school characteristics is freely available information from Myanmar, for the [upper](https://data.humdata.org/dataset/mimu-geonode-formal-sector-school-location-upper-myanmar) and [lower](https://data.humdata.org/dataset/mimu-geonode-formal-sector-school-location-lower-myanmar) areas in the country.

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
