// XML file location
var catalogXmlFile = 'Avinashforts.kml';
forts=[]
fortMarkers=[]
getXMLDocObject(catalogXmlFile, function(xmlDoc) {

    // extract the info from the xmlDoc object
    var folders = xmlDoc.getElementsByTagName('Folder');
    
    for(var f=0; f < folders.length;f++) {
        var cat = folders[f].children[0].innerHTML;
        var place = folders[f].getElementsByTagName('Placemark')
	    for (var i = 0; i < place.length; i++) {

            // var childNodeName1 = place[i].children[0].nodeName;
            var fort = place[i].children[0].innerHTML;

            // debugger;
            // var childNodeName2 = place[i].getElementsByTagName('coordinates');
            var coords = place[i].getElementsByTagName('coordinates').item(0).innerHTML.replace(/[ \n]*/g, '');

            // console.log(cat + ': ' + fort+ ': ' + coords);
            latlon=coords.split(",").slice(0,2).map(Number)
            forts.push({"fort":fort,
                        "category":cat,
                        "coord":latlon})
            fortMarkers.push(L.marker(latlon).bindPopup(fort+":"+cat))
            // console.log('----');
        }

	}
});

// get content and parse it to Document Object Model
function getXMLDocObject(xmlFile, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if ((this.readyState === 4) && (this.status === 200)) {
            var xmlContent = this.responseText;
            var xmlDoc = parseXML(xmlContent);
            callback(xmlDoc);
        }
    };
    xhttp.open('GET', xmlFile, true);
    xhttp.send();
}

// parse a text string into an XML DOM object
function parseXML(xmlContent) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    return xmlDoc;
}
