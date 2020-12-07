
	const fortCategories = [...new Set(forts.map(item => item.category))];

	// var iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);


	var fortIcons={}
	for (fCat of fortCategories){
		iconUrl={"Sahyadri Hill":"/images/fort_icon-red.svg", 
				  "India nonSahyadri forts":"/images/fort_icon-blue.svg", 
				  "Sahyadri nonHill":"/images/fort_icon-brown.svg", 
				  "Intl Forts":"/images/fort_icon-red.svg", 
				  "remaining forts":"/images/fort_icon-green.svg", 
				  "Planned forts":"/images/fort_icon-blue.svg" }[fCat]
		// debugger;
		fortIcons[fCat] = L.icon({
			iconUrl: iconUrl,
			size: "s"
		})
	}

    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        

    var littleton = L.marker([20, 73.79]).bindPopup('This is Nashik.'),
        denver    = L.marker([19.21, 72.97]).bindPopup('This is Thane.'),
        aurora    = L.marker([17.69, 74]).bindPopup('This is Satara'),
        golden    = L.marker([16.7, 74.23]).bindPopup('This is Kolhapur.');    
	var cities = L.layerGroup([littleton, denver, aurora, golden]);
		fms=forts.map((x) => { 
			return L.marker([x.coord[1], x.coord[0]], {icon: fortIcons[x.category] , title:x.fort})
			                .bindPopup(x.fort+':'+x.category)}),
		fortLayer= L.layerGroup( fms )
		// Cluster
		var markers = L.markerClusterGroup();
		for (i in fms) {
			markers.addLayer(fms[i]);
		}
    var grayscale = L.tileLayer(mbUrl, {id: 'mapbox/streets-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
        streets   = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
	var OpenTopoMap = L.tileLayer.provider('OpenTopoMap')

	var baseLayers = {
			"Grayscale": grayscale,
			"Streets": streets,
			"Topo":OpenTopoMap,
			"OSM Mapnik": L.tileLayer.provider('OpenStreetMap.Mapnik'),
			"ESRI Imagery": L.tileLayer.provider('Esri.WorldImagery'),
			"HikeBike": L.tileLayer.provider('HikeBike.HikeBike'),
			"HERE.hybridDay": L.tileLayer.provider('HEREv3.hybridDay'),
			"HERE.normalNight": L.tileLayer.provider('HEREv3.normalNight'),
			
		};
	
    var map = L.map('mapid', {
        center: [18.5204, 73.85],
        zoom: 8,
        layers: [grayscale, fortLayer]
    });

	map.addLayer(markers);

    fortIcon='https://upload.wikimedia.org/wikipedia/commons/3/3e/Grey_castle_icon.svg'
    // a = omnivore.kml('Avinashforts.kml')
    // debugger;
    // var runLayer =a.on('ready', function() {
    //     map.fitBounds(runLayer.getBounds());
    // })
    // .addTo(map);
    


	var overlays = {
		"Cities": cities,
        "forts": fortLayer,
		"WaymarkedTrails.hiking": L.tileLayer.provider('WaymarkedTrails.hiking'),
	};

	L.control.layers(baseLayers, overlays).addTo(map);
    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	// 	maxZoom: 18,
	// 	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
	// 		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	// 		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	// 	id: 'mapbox/streets-v11',
	// 	tileSize: 512,
	// 	zoomOffset: -1
	// }).addTo(mymap);

	L.marker([18.5204, 73.85]).addTo(map)
		.bindPopup("<b>Hello fort raiders!</b><br />Let's start in Pune.").openPopup();

	// L.circle([51.508, -0.11], 500, {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.5
	// }).addTo(mymap).bindPopup("I am a circle.");

	// L.polygon([
	// 	[51.509, -0.08],
	// 	[51.503, -0.06],
	// 	[51.51, -0.047]
	// ]).addTo(mymap).bindPopup("I am a polygon.");


	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Lat/Long " + e.latlng.toString())
			.openOn(map);
	}

	map.on('dblclick', onMapClick);

