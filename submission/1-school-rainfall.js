var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD"),
    gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    schools = ee.FeatureCollection("users/santhoshlab31/hack1/lowermyanmar_schools");


// Input Start 
var school = 'အထက(ခွဲ)(ငရုပ်ကောင်း(တ))' 

var loadYear = 1996

// Input End 

//-------------//
//-------------//
//-------------//
//-------------//

// Computation 

var schoolNames = schools.aggregate_array('schoolname')

print(schoolNames, 'schoolNames')

Map.addLayer(schools, {}, 'schools', false)

var roi = schools.filter(ee.Filter.eq('schoolname', school))

Map.addLayer(roi, {}, school)
Map.centerObject(roi, 11)

print(roi)


var startDate = ee.Date.fromYMD(loadYear, 1, 1)
var endDate = startDate.advance(1, 'year')

var image = chirps.filter(ee.Filter.date(startDate, endDate)).sum()

var palette = ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494']
var visParams = {
    min:3000,
    max: 4000,
    palette: palette}

var layerName = ee.Number(loadYear).format('%s')

layerName.evaluate(function(n){
  Map.addLayer(image, visParams, n, false)
})




var years = ee.List.sequence(1981, 2020)

var getYearlyPrecipitation = function(year){
  var start = ee.Date.fromYMD(year, 1, 1)
  var end = start.advance(1, 'year')
  var image = chirps.filter(ee.Filter.date(start, end)).sum()
  
  var values = image.reduceRegion({
  reducer:ee.Reducer.mean(),
  geometry:chennai,
  scale:5566,
  maxPixels:1e16,
  tileScale:8})
  
  var precipitation = values.get('precipitation')
  
  return ee.Feature(null, {'precipitation':precipitation, 'year':ee.Date.fromYMD(year,1,1)})
}

var yearlyPrecipitation = ee.FeatureCollection(years.map(getYearlyPrecipitation))

print(yearlyPrecipitation, 'yearlyPrecipitation')

var plot = ui.Chart.feature.byFeature({
  features:yearlyPrecipitation,
  xProperty:'year', 
  yProperties:'precipitation'}).setOptions({
      interpolateNulls: true,
      lineWidth: 1,
      pointSize: 3,
      title: 'Yearly Precipitation',
      vAxis: {title: 'Yearly Precipitation (mm/pentad)'},
      hAxis: {title: 'Years'}

});
  
print(plot)

Export.table.toDrive({
  collection:yearlyPrecipitation,
  description:'yearlyPrecipitation',
  folder:'ee-IIEP',
  fileNamePrefix:'yearlyPrecipitation_mon',
  fileFormat:'CSV'})
  