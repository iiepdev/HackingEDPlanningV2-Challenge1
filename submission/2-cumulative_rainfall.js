
// var ts = region.filter(ee.Filter.eq('ts_eng', 'Bago'))

var school = ee.Geometry.Point([94.4484663392614, 16.4059969775708]);
var roi = school.buffer(500)

var coll1 = yearlyCompute(2018)
var coll2 = yearlyCompute(2019)
var coll3 = yearlyCompute(2020)

var fullColl = ee.ImageCollection(coll1.merge(coll2).merge(coll3))

print(fullColl)

var plot = ui.Chart.image.doySeriesByYear({
  imageCollection:fullColl,
  bandName:'precipitation',
  region:roi, 
  regionReducer:ee.Reducer.mean(),
  scale:5566}).setOptions({
      interpolateNulls: true,
      lineWidth: 1,
      pointSize: 3,
      title: 'Cumulative Rainfall',
      vAxis: {title: 'Cumulative Rainfall (mm)'},
      hAxis: {title: 'Days'}

});

print(plot)


/// Yeraly Compute function.  


function yearlyCompute(year){
  
var start = ee.Date.fromYMD(year, 1, 1)
var end = start.advance(1, 'year')
var dataset = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                  .filter(ee.Filter.date(start, end));
                  
var precipitation = dataset.select('precipitation');

var cumulative = ee.ImageCollection(ee.List(precipitation.iterate(accumulate, ee.List([ee.Image(0)]))));

function accumulate(image, list) {
  var previous = ee.Image(ee.List(list).get(-1));
  var added = image.add(previous)
  added = added.set('system:time_start', image.get('system:time_start'));
  return ee.List(list).add(added);
}


var cumulativeVis = {
  min: 1.0,
  max: 3000.0,
  palette: ['001137', '0aab1e', 'e7eb05', 'ff4a2d', 'e90000'],
};

var cumColl = cumulative.filter(ee.Filter.eq('system:index', '0').not())

return  cumColl
}





