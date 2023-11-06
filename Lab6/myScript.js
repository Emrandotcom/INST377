function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function createMap() {
    const map = L.map('map').setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const coordinates1 = {
        latitude: getRandomInRange(30, 35, 3),
        longitude: getRandomInRange(-90, -100, 3),
    };
    const coordinates2 = {
        latitude: getRandomInRange(30, 35, 3),
        longitude: getRandomInRange(-90, -100, 3),
    };
    const coordinates3 = {
        latitude: getRandomInRange(30, 35, 3),
        longitude: getRandomInRange(-90, -100, 3),
    };

    createMarker(map, coordinates1, 'marker1-coordinates', 'Marker 1');
    createMarker(map, coordinates2, 'marker2-coordinates', 'Marker 2');
    createMarker(map, coordinates3, 'marker3-coordinates', 'Marker 3');
}

function createMarker(map, coordinates, elementId, markerText) {
    const marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(map);

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality;

            document.getElementById(elementId).textContent = `${markerText}: ${coordinates.latitude}, ${coordinates.longitude}, Locality: ${locality}`;
        })
        .catch(error => console.error(error));
}

createMap();
