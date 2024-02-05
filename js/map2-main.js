mapboxgl.accessToken =
'pk.eyJ1IjoiZWhsNyIsImEiOiJjbG9vdHd5c3gwMWttMmpuMGp4ZWxlamUzIn0.wYyVzZnzVph_EMghQUhLWQ';
let map = new mapboxgl.Map({
container: 'map', // container ID
projection: 'albers',
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 4.2, // starting zoom
minZoom: 4, // minimum zoom level of the map
center: [-98, 39.5] // starting center
});

map.on('load', () => {
    map.addSource('covid_counts', {
        type: 'geojson',
        data: 'assets/covid_counts.geojson'
    });

    const cases = [0, 1000, 5000, 10000, 20000, 50000, 100000, 300000],
    colors = ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486'],
    radii = [2, 5, 10, 15, 20, 30, 40, 50];

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
                    [cases[5], radii[5]],
                    [cases[6], radii[6]],
                    [cases[7], radii[7]]
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
                    [cases[5], colors[5]],
                    [cases[6], colors[6]],
                    [cases[7], colors[7]]
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
            .setHTML(`<strong>${e.features[0].properties.county}, ${e.features[0].properties.state}</strong><br><Strong>Cases:</strong> ${e.features[0].properties.cases}`)
            .addTo(map);
    });

});