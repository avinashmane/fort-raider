
	var fortIcons={}

	const fortTypes = [...new Set(forts.map(item => item.type))];
	for (fCat of fortTypes){
		iconUrl={"Hill":"/images/fort_icon-red.svg", 
				  "Water":"/images/fort_icon-blue.svg", 
				  "Land":"/images/fort_icon-brown.svg",
				  "Misc":"/images/fort_icon-green.svg",
				  "":"/images/fort_icon-green.svg"}[fCat]
		// debugger;
		fortIcons[fCat] = L.icon({
			iconUrl: iconUrl,
			size: "m"
		})
	}

    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        


	fms=forts.map((x) => { 
		return L.marker([x.lat, x.lng],
			//  {icon:  L.divIcon({
			//     className: 'text-labels',   // Set class for CSS styling
			//     html: '<i class="fa fa-fort-awesome" aria-hidden="true"></i><div class="fort">'+x.fort.replace(" Fort","")+'</div>'}) 
			{icon: fortIcons[x.type],
			 title:x.fort})
			.bindPopup(`<div><div class=fortname>${x.fort}</div><div>Fort Type: ${x.type}</div><div><a href="${x.link}" target="_blank">${x.link ? "Info" : ""}</a> : <a href="${x.wiki}" target="_blank">${x.wiki?"Wiki":""}</a></div></div>`)
		})

	var fortLayer;
	// searchLayer= L.layerGroup( fms )
	// Cluster
	var markers = L.markerClusterGroup();
	for (i in fms) {
		fortLayer =markers.addLayer(fms[i]);
	}
	
	var  streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

	var baseLayers = {
			"Streets": streets,
			"OSM Mapnik": L.tileLayer.provider('OpenStreetMap.Mapnik'),
			"Topo":L.tileLayer.provider('OpenTopoMap'),
			"ESRI Imagery": L.tileLayer.provider('Esri.WorldImagery'),
			"HikeBike": L.tileLayer.provider('HikeBike.HikeBike'),
			"HERE.hybridDay": L.tileLayer.provider('HEREv3.hybridDay'),
			"HERE.normalNight": L.tileLayer.provider('HEREv3.normalNight'),
		};
	
    var map = L.map('mapid', {
        center: [18.5204, 73.85],
        zoom: 8,
        layers: [streets, fortLayer]
    });

	map.addLayer(markers);

	// a = omnivore.kml('Avinashforts.kml')
    // debugger;
    // var runLayer =a.on('ready', function() {
    //     map.fitBounds(runLayer.getBounds());
    // })
	// .addTo(map);
	
	// var searchLayer = L.layerGroup().addTo(map);
	var controlSearch = new L.Control.Search({
		position:'topright',		
		layer: fortLayer,
		initial: false,
		zoom: 12,
		marker: false
	});

	map.addControl( controlSearch );

	var overlays = {
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
		.bindPopup(`<b>Hello fort raiders!</b><br />Let's start exploring ${forts.length} forts.<br/>More trails and forts being added.`).openPopup();

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


	// //... adding data in searchLayer ...
	// map.addControl( new L.Control.Search({layer: searchLayer}) );
	// //searchLayer is a L.LayerGroup contains searched markers

/*
	var pointA = new L.LatLng(18.806817, 74.349976);
	var pointB = new L.LatLng(18.984461, 73.70641);
	var pointList = [pointA, pointB];
	// debugger;
	encoded='ku|dBkuadMZ_HmQaBcAxAgV{pAiL}cEofFuIibAnNA]}b`@i}@me{Adxc@cuwAp|[_qf@c{J}huBdgv@e~SffkAi_s@hys@iiD`zHyvHv{@wwEzu@iMjq@}d@v~E_SiMqfD_c@kj@fJixB_mAkKuJy}BpEyaA~Aoj@nOkvEnmLw~qAkvCcdnBt`Fge@u_@mjkAwiIk_TacUi__@nnS{ysAtGi~bDywk@qsQaiLqc@o@wZtI}fC`mBaIr^aoZsfm@yxTb~AmeYyxZgiHumNybEhhHqFj[W~@EV{i~AnqF_jb@jnv@mce@kmL{J{_@_kQmb[sk}@yva@ogrAxoB_hOw_JmyFryA}eBaw@_sEwo@majAg`Ysuy@bxPi`pC_rmBu{gAazeAebkAichEwySg`E{ql@}gb@wvZqy@}y_B}{{@evaAoceBqjjAu|gAiR`AgAeBcAsBiaFupCkdA_p@oCz@}y@mk@}QtCmXsJmB_ALUyDoMyQw~@]fH^C' ;
	pointList= L.PolylineUtil.decode(encoded);
	// console.log(pointList)
	var firstpolyline = new L.polyline( pointList , {
			color: 'red',
			weight: 3,
			opacity: 0.5,
			smoothFactor: 1
		});

		firstpolyline.addTo(map);

		runner=L.motion.polyline(pointList, {
			color: "transparent"
		}, {
			auto: true,
			duration: 3000,
			easing: L.Motion.Ease.easeInOutQuart
		}, {
			removeOnEnd: false,
			showMarker: true,
			// icon: L.divIcon({html: "<H1>AA</H1><i class='fa fa-car fa-2x' aria-hidden='true'></i>", iconSize: L.point(27.5, 24)})
		}).addTo(map);
*/
/*
	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Lat/Long " + e.latlng.toString())
			.openOn(map);
	}

	map.on('dblclick', onMapClick);
*/
