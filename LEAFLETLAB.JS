// Map and canvas need variables
let myMap;
let canvas;

// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

// Consolidate map options
const options = {
  lat: 49.2827,
  lng: -123.1207,
  zoom: 3,
  style: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
}


function setup(){
  canvas = createCanvas(1080,740); 
  myMap = mappa.tileMap(options)
  myMap.overlay(canvas);


// CSV files
  meteorites1 = loadTable('Meteorite_Landings.csv', 'csv', 'header');
  meteorites2 = loadTable('Meteorite_Landings.csv', 'csv', 'header');
  meteorites3 = loadTable('Meteorite_Landings.csv', 'csv', 'header');
  myMap.onChange(drawMeteorites);
}

function draw(){
}



function drawMeteorites(){
  clear();
  for (let i = 0; i < meteorites1.getRowCount(); i++){
      const latitude = Number(meteorites1.getString(i, 'reclat'));
      const longitude = Number (meteorites1.getString(i, 'reclong'));
      const mass = Number(meteorites1.getString(i, 'mass (g)'));

      if (mass >= 1000000 && myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
          const pos = myMap.latLngToPixel(latitude, longitude);
          let size = meteorites1.getString(i, 'mass (g)');
          size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
          noFill();
          stroke(255, 0, 0, 75);
          strokeWeight(1);
          ellipse(pos.x, pos.y, size, size);
          
        }
      }
  for (let i = 0; i < meteorites2.getRowCount(); i++){
        const latitude = Number(meteorites2.getString(i, 'reclat'));
        const longitude = Number (meteorites2.getString(i, 'reclong'));
        const name = meteorites1.getString(i, 'name');
        const mass = Number(meteorites1.getString(i, 'mass (g)'));
  
        if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
            const pos = myMap.latLngToPixel(latitude, longitude);
            let size = meteorites2.getString(i, 'mass (g)');
            size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
            fill(222, 249, 227, 10);
            ellipse(pos.x, pos.y, size, size);
            noStroke();

            const d = dist(mouseX, mouseY, pos.x, pos.y);
            if (d < 10) {
              fill(255);
              text(name, mouseX + 10, mouseY);
            }   
          }
        }
for (let i = 0; i < meteorites3.getRowCount(); i++){
          const latitude = Number(meteorites3.getString(i, 'reclat'));
          const longitude = Number (meteorites3.getString(i, 'reclong'));
    
          if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
              const pos = myMap.latLngToPixel(latitude, longitude);
              let size = meteorites3.getString(i, 'mass (g)');
              size = 1;
              fill(255, 255, 255, 150);
              ellipse(pos.x, pos.y, size, size);
            }
          }
    }

// function drawMeteorites(){
//     clear();
//     for (let i = 0; i < meteorites.getRowCount(); i++){
//         const latitude = Number(meteorites.getString(i, 'reclat'));
//         const longitude = Number (meteorites.getString(i, 'reclong'));

//         if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
//             const pos = myMap.latLngToPixel(latitude, longitude);
//             let size = meteorites.getString(i, 'mass (g)');
//             size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
//             ellipse(pos.x, pos.y, size, size);
//           }
//         }
//       }
      

// function drawPoint(){
  
//   clear();

//  // Every Frame, get the canvas position for the latitude and longitude of Nigeria
//   const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
//   // Using that position, draw an ellipse
//   ellipse(nigeria.x, nigeria.y, 20, 20);
// }