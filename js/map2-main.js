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

map.on('load', () => {
    map.addSource('covid_counts', {
        type: 'geojson',
        data: 'assets/covid_counts.geojson'
    });

    const cases = [0, 1000, 5000, 10000, 20000, 50000, 100000, 300000], 
    //colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'], 
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
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6
        }
    });

});