mapboxgl.accessToken =
'pk.eyJ1IjoiZWhsNyIsImEiOiJjbG9vdHd5c3gwMWttMmpuMGp4ZWxlamUzIn0.wYyVzZnzVph_EMghQUhLWQ';
let map = new mapboxgl.Map({
container: 'map', // container ID
projection: 'albers',   
style: 'mapbox://styles/mapbox/light-v10',
zoom: 4.2, // starting zoom
minZoom: 4, // minimum zoom level of the map
center: [-98, 39.5] // starting center 
});

async function geojsonFetch() { 

let response = await fetch('assets/covid_rates.geojson');
let countyRates = await response.json();

map.on('load', function loadingData() {
    
    map.addSource('countyRates', {
        type: 'geojson',
        data: countyRates
    });

    map.addLayer({
        'id': 'countyRates-layer',
        'type': 'fill',
        'source': 'countyRates',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'],
                '#fee5d9',   // stop_output_0
                30,          // stop_input_0
                '#fcbba1',   // stop_output_1
                50,          // stop_input_1
                '#fc9272',   // stop_output_2
                70,          // stop_input_2
                '#fb6a4a',   // stop_output_3
                90,         // stop_input_3
                '#ef3b2c',   // stop_output_4
                110,         // stop_input_4
                '#cb181d',   // stop_output_5
                130,         // stop_input_5
                '#99000d'
            ],
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.85,
        }
    });

    map.on('click', 'countyRates-layer', (e) => {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${e.features[0].properties.county}, ${e.features[0].properties.state}</strong><br><Strong>Rate:</strong> ${e.features[0].properties.rates}`)
        .addTo(map);
    });

    // add legend
    const layers = [
        '0-29',
        '30-49',
        '50-69',
        '70-89',
        '90-109',
        '110-129',
        '130+'
    ];
    const colors = [
        '#fee5d9',
        '#fcbba1',
        '#fc9272',
        '#fb6a4a',
        '#ef3b2c',
        '#cb181d',
        '#99000d'
    ];

    legend = document.getElementById('legend');
    legend.innerHTML = "<b>2020 Covid-19 Infection Rate<br>(per 1000 people)</b><br><br>";

    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });
});
}

geojsonFetch();