mapboxgl.accessToken =
'pk.eyJ1IjoiZWhsNyIsImEiOiJjbG9vdHd5c3gwMWttMmpuMGp4ZWxlamUzIn0.wYyVzZnzVph_EMghQUhLWQ';
let map = new mapboxgl.Map({
container: 'map', // container ID
projection: 'albers',
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 3.2, // starting zoom
minZoom: 3, // minimum zoom level of the map
center: [-98, 37] // starting center
});

const cases = [1000, 5000, 10000, 50000, 100000, 300000],
        colors = ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#c51b8a', '#7a0177'],
        radii = [5, 10, 15, 20, 30, 40];

map.on('load', () => {
    map.addSource('covid_counts', {
        type: 'geojson',
        data: 'assets/covid_counts.geojson'
    });

    map.addLayer({
        'id': 'count-points',
        'type': 'circle',
        'source': 'covid_counts',
        'paint': {
            // increase the radii of the circle as the zoom level and dbh value increases
            'circle-radius': {
                'property': 'cases',
                'stops': [
                    [cases[0], radii[0]],
                    [cases[1], radii[1]],
                    [cases[2], radii[2]],
                    [cases[3], radii[3]],
                    [cases[4], radii[4]],
                    [cases[5], radii[5]]
                ]
            },
            // change the color of the circle as mag value increases
            'circle-color': {
                'property': 'cases',
                'stops': [
                    [cases[0], colors[0]],
                    [cases[1], colors[1]],
                    [cases[2], colors[2]],
                    [cases[3], colors[3]],
                    [cases[4], colors[4]],
                    [cases[5], colors[5]]
                ]
            },
            'circle-stroke-color': '#4a1486',
            'circle-stroke-width': 1,
            'circle-opacity': 0.8
        }
    });

    map.on('click', 'count-points', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(`<strong>${e.features[0].properties.county} County, ${e.features[0].properties.state}</strong><br><Strong>Cases:</strong> ${e.features[0].properties.cases}`)
            .addTo(map);
    });

});

// create legend
const legend = document.getElementById('legend');
//set up legend cases and labels
var labels = ['<strong>Number of Cases</strong>'],
    vbreak;
//iterate through cases and create a scaled circle and label for each
for (var i = 0; i < cases.length; i++) {
    vbreak = cases[i];
    // you need to manually adjust the radius of each dot on the legend
    // in order to make sure the legend can be properly referred to the dot on the map.
    dot_radii = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
        'px; height: ' +
        dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
        '</span></p>');
}

// combine all the html codes.
legend.innerHTML = labels.join('');