var srtm = ee.Image("CGIAR/SRTM90_V4"),
    geometry =   ee.Geometry.Polygon([[[96.1768372174987, 16.87186659100341],  [96.1779530164489, 16.869731037465737],
                                        [96.18250204293815, 16.866034830071897],
                                        [96.20413137643425, 16.877533904496087],
                                        [96.20035482614128, 16.88394022799847]]]);
          
// App - Start

var mainPanel = ui.Panel({
  style: {width: '450px'}
});

var title = ui.Label({
  value: "School's in Flooded Region",
  style: {'fontSize': '24px'}
});

mainPanel.add(title)

var div1 = ui.Panel({style:{
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
}})
mainPanel.add(div1)

var subHeading1 = ui.Label({
  value: 'Select Flood Date',
  style: {'fontSize': '18px'}
});

mainPanel.add(subHeading1)

// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel);

var yearSelector = ui.Select({
  placeholder: 'please wait..',
  })

var monthSelector = ui.Select({
  placeholder: 'please wait..',
  })

var dateSelector = ui.Select({
  placeholder: 'please wait..',
  })


dropdownPanel.add(yearSelector)
dropdownPanel.add(monthSelector)
dropdownPanel.add(dateSelector)

var div2 = ui.Panel({style:{
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
}})
mainPanel.add(div2)

var section2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
})

var section2a = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
})

var section2b = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
})

var section2c = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
})

var subHeading2 = ui.Label({
  value: 'Time Range (days)',
  style: {'fontSize': '16px'}
});

section2a.add(subHeading2)


var durationSelector = ui.Select({
  placeholder: 'please wait..',
  })

section2a.add(durationSelector)

var subHeading3 = ui.Label({
  value: 'Select Pass',
  style: {'fontSize': '16px'}
});

section2b.add(subHeading3)

var passSelector = ui.Select({
  items:['ASCENDING', 'DESCENDING'],
  placeholder:'Select a Pass',
})

section2b.add(passSelector)

var subHeading4 = ui.Label({
  value: 'Enter Threshold',
  style: {'fontSize': '16px'}
});

section2c.add(subHeading4)

var getThreshold = ui.Textbox({
  placeholder:'1.25',
  value:'1.25'
})

section2c.add(getThreshold)

section2.add(section2a)
section2.add(section2b)
section2.add(section2c)
mainPanel.add(section2)

var div3 = ui.Panel({style:{
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
}})
mainPanel.add(div3)

var computeButton = ui.Button({
  label:'compute', 
  onClick:function(){compute()},
  disabled:false, 
  style:{color:'green'}
})
mainPanel.add(computeButton)

var resultPanel =  ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
})

var beforeDateLabel = ui.Label({
  value: 'Images Dates (Pre Flood)',
  style: {'fontSize': '16px'}
});

var showBeforeDates = ui.Label()

var afterDateLabel = ui.Label({
  value: 'Images Dates (Post Flood)',
  style: {'fontSize': '16px'}
});

var showAfterDates = ui.Label()

var floodAreaLabel = ui.Label({
  value: 'Flood Area (sqmt)',
  style: {'fontSize': '16px'}
});

var showFloodArea = ui.Label()

resultPanel.add(beforeDateLabel)
resultPanel.add(showBeforeDates)
resultPanel.add(afterDateLabel)
resultPanel.add(showAfterDates)
resultPanel.add(floodAreaLabel)
resultPanel.add(showFloodArea)

var sayDownloadReady = ui.Label({
  value: 'Check TASKS tab to download affected school location',
  style: {'fontSize': '16px'}
});

resultPanel.add(sayDownloadReady)

resultPanel.style().set({shown:false})

mainPanel.add(resultPanel)

// Let's add a dropdown with the years
var years = ee.List.sequence(2016, 2021)
var months = ee.List.sequence(1, 12)
var dates = ee.List.sequence(1, 31)
var duration = ee.List.sequence(5, 20)

// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d')
})
var dateStrings = dates.map(function(date){
  return ee.Number(date).format('%01d')
})
var durationStrings = duration.map(function(date){
  return ee.Number(date).format('%01d')
})

// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('select a year')
})

monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList)
  monthSelector.setPlaceholder('select a month')
})

dateStrings.evaluate(function(dateList) {
  dateSelector.items().reset(dateList)
  dateSelector.setPlaceholder('select a date')
})

durationStrings.evaluate(function(durationList) {
  durationSelector.items().reset(durationList)
  durationSelector.setPlaceholder('select a duration')
})

ui.root.add(mainPanel);

var drawingTools = Map.drawingTools();

// drawingTools.setShown(false)

// function clearGeometry() {
//   var layers = drawingTools.layers();
//   layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
// }

// App - End

// Input - Section Start 

var myanmar = ee.FeatureCollection("users/santhoshlab31/hack1/township_myanmar"),
    school_upper = ee.FeatureCollection("users/santhoshlab31/hack1/uppermyanmar_schools"),
    school_lower = ee.FeatureCollection("users/santhoshlab31/hack1/lowermyanmar_schools");

// Input - Section End

function compute() {
Map.clear()
var year = ee.Number.parse(yearSelector.getValue())
var month = ee.Number.parse(monthSelector.getValue())
var date = ee.Number.parse(dateSelector.getValue())
var timeRange = ee.Number.parse(durationSelector.getValue())
var timeUnit = ee.String('day')
var diffThreshold = ee.Number.parse(getThreshold.getValue());
var drawingTools = Map.drawingTools()
var layers = drawingTools.layers()
var geometry = layers.get(0).geometries().get(0)
var floodsEvent = ee.Date.fromYMD(year, month, date)
var floodsAfter = floodsEvent.advance(timeRange, timeUnit)

var endTimeRange = timeRange.multiply(-1)
var floodsBefore = floodsEvent.advance(endTimeRange, timeUnit)

print(floodsEvent, floodsAfter, floodsBefore, timeRange, diffThreshold)

var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING')) 
  .filter(ee.Filter.eq('resolution_meters',10))
  .filterBounds(geometry)
  .select(['VV', 'VH'])

var beforeCollection = collection.filterDate(floodsBefore, floodsEvent)
var afterCollection = collection.filterDate(floodsEvent,floodsAfter)

function getDates(image){
  var date = ee.Date(ee.Image(image).get('system:time_start')).format('yyyy-MMM-dd')
  return ee.Feature(null, {'dates':date})
}

var beforeDates = ee.FeatureCollection(beforeCollection.map(getDates)).aggregate_array('dates')
beforeDates.evaluate(function(x){
  showBeforeDates.setValue(x)
})


var afterDates = ee.FeatureCollection(afterCollection.map(getDates)).aggregate_array('dates')
afterDates.evaluate(function(x){
   showAfterDates.setValue(x)  
   resultPanel.style().set({shown:true})
   showFloodArea.setValue('computing...')
})



var before = beforeCollection.mosaic().clip(geometry);
var after = afterCollection.mosaic().clip(geometry);

var beforeRGB = before.addBands(before.select('VV').divide(before.select('VH')).rename('VV/VH'))
var afterRGB = after.addBands(after.select('VV').divide(after.select('VH')).rename('VV/VH'))

print(beforeCollection, afterCollection)

var beforeFiltered = ee.Image(toDB(RefinedLee(toNatural(before))))
var afterFiltered = ee.Image(toDB(RefinedLee(toNatural(after))))

var visParams = {min:[-25, -25, 0] ,max:[0, 0, 2]}
Map.addLayer(beforeRGB, visParams, 'Before Floods', false);
Map.addLayer(afterRGB, visParams, 'After Floods', false);



var difference = afterFiltered.divide(beforeFiltered);


Map.centerObject(geometry, 14)

// Initial estimate of flooded pixels
var flooded = difference.gt(diffThreshold).rename('water').selfMask();

var gsw = ee.Image('JRC/GSW1_3/GlobalSurfaceWater')

// Mask out area with permanent/semi-permanent water
var permanentWater = gsw.select('seasonality').gte(6)

// GSW data is masked in non-water areas. Set it to 0 using unmask()
// Invert the image to set all non-permanent regions to 1

var permanentWaterMask = permanentWater.unmask(0).not()

var flooded = flooded.updateMask(permanentWaterMask)
// Mask out areas with more than 5 percent slope using the HydroSHEDS DEM
var slopeThreshold = 5;
var terrain = ee.Terrain.slope(srtm);
print(terrain)
var slope = terrain.select('slope');
var steepAreas = slope.gt(slopeThreshold)
var slopeMask = steepAreas.not()

var flooded = flooded.updateMask(slopeMask)

var connectedPixelThreshold = 8;
var connections = flooded.connectedPixelCount(25)
var disconnectedAreas = connections.lt(connectedPixelThreshold)
var disconnectedAreasMask = disconnectedAreas.not()

flooded = flooded.updateMask(disconnectedAreasMask)

Map.addLayer(flooded, {min:0, max:1, palette: ['red']}, 'Flooded Areas');

var areaImage = flooded.multiply(ee.Image.pixelArea())

var area = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e10
  })

var floodAreaSqKm = ee.Number(area.get('water'))

floodAreaSqKm.evaluate(function(x){
   showFloodArea.setValue(x)  
})



var vector = flooded.reduceToVectors({
  reducer: ee.Reducer.countEvery(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12,
  eightConnected: false,
  tileScale:16
})


var floodsVector = vector.filter(ee.Filter.eq('label',1))

var allSchools = school_upper.merge(school_lower) 

var affectedSchools = allSchools.filter(ee.Filter.bounds(floodsVector))

Export.table.toDrive({
  collection:affectedSchools,
  description:'affectedSchools',
  folder:'ee-IIEP',
  fileNamePrefix:'affected_schools',
  fileFormat:'CSV'})


//############################
// Speckle Filtering Functions
//############################

// Function to convert from dB
function toNatural(img) {
  return ee.Image(10.0).pow(img.select(0).divide(10.0));
}

//Function to convert to dB
function toDB(img) {
  return ee.Image(img).log10().multiply(10.0);
}

//Apllying a Refined Lee Speckle filter as coded in the SNAP 3.0 S1TBX:

//https://github.com/senbox-org/s1tbx/blob/master/s1tbx-op-sar-processing/src/main/java/org/esa/s1tbx/sar/gpf/filtering/SpeckleFilters/RefinedLee.java
//Adapted by Guido Lemoine

// by Guido Lemoine
function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB!
  // Set up 3x3 kernels 
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);

  var mean3 = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);

  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);

  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);

  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel); 
  var sample_var = variance3.neighborhoodToBands(sample_kernel);

  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());

  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());

  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);

  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);

  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));

  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);

  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  

  //var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
  //Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);

  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));

  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);

  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));

  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0], 
    [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);

  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);

  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));

  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));

  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }

  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());

  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));

  var b = varX.divide(dir_var);

  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  return(result.arrayFlatten([['sum']]));
}
  
}


