// Map and canvas need variables
let myMap;
let canvas;

// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

// Consolidate map options
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
}

function setup(){
  canvas = createCanvas(640,640); 
  myMap = mappa.tileMap(options)
  myMap.overlay(canvas);
  fill(200, 100, 100);
  //myMap.onChange(drawPoint);

  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');
  myMap.onChange(drawMeteorites);
  fill(70, 203,31); 
  stroke(100);
}

function draw(){
}

function drawMeteorites(){
    clear();
    for (let i = 0; i < meteorites.getRowCount(); i++){
        const latitude = Number(meteorites.getString(i, 'reclat'));
        const longitude = Number (meteorites.getString(i, 'reclong'));

        if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
            const pos = myMap.latLngToPixel(latitude, longitude);
            let size = meteorites.getString(i, 'mass (g)');
            size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
            ellipse(pos.x, pos.y, size, size);
          }
        }
      }
      

// function drawPoint(){
  
//   clear();

//  // Every Frame, get the canvas position for the latitude and longitude of Nigeria
//   const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
//   // Using that position, draw an ellipse
//   ellipse(nigeria.x, nigeria.y, 20, 20);
// }