console.log('Hello world!');

// require('dotenv').config();
// const mapboxToken = process.env.MAPBOX_API_TOKEN;
// mapboxgl.accessToken = mapboxToken;

mapboxgl.accessToken =
  'pk.eyJ1Ijoib2N0b3BoaW5kb20iLCJhIjoiY2xvNzk3a3BlMDNkbTJqb2U1d3FhN2h6dCJ9.ftJp7fPW07v0Sd-G9hVGEA';

const map = new mapboxgl.Map({
  container: 'map', // container ID

  style: 'mapbox://styles/mapbox/streets-v9',

  center: [-0.127758, 51.507351],

  zoom: 12,
});

const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true,
  },
  defaultMode: 'draw_polygon',
});
map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea(e) {
  const data = draw.getAll();
  const answer = document.getElementById('calculated-area');
  if (data.features.length > 0) {
    const area = turf.area(data.features[0].geometry);
    const rounded_area = Math.round(area * 100) / 100;
    answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
  } else {
    answer.innerHTML = '';
    if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
  }
}
