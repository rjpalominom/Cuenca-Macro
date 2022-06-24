// Referencia a mapbox.com
var mbAttr = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery &copy; <a href="https://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

// ---------------------------------------------------------------
// Referencia a openstreetmap.org
var osmAttrib = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
	osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var osm2 = L.tileLayer(osmUrl, {attribution: osmAttrib});

// ---------------------------------------------------------------
// Referencia al Orthophoto del LAiV M-V (WMS)
var wms_dop_laiv = L.tileLayer.wms("https://www.geodaten-mv.de/dienste/adv_dop", {
    layers: 'mv_dop',
    format: 'image/png',
	transparent: true,
    attribution: '&copy; <a href="https://www.laiv-mv.de/">LAiV_M-V</a> 2021'
});

// ---------------------------------------------------------------
// Vizualización sin mapa
var osmAttrib = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
	osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var osm_leer = L.tileLayer(osmUrl, {attribution: osmAttrib, opacity: 0.0});

var none = L.tileLayer.wms(" ", {
    layers: 'none',
    format: 'image/png',
	transparent: true,
	crs: 4326
});

// ---------------------------------------------------------------
// Parametros del mapa al principio
var map = L.map('map', {
	center: [-13.55, -74.20],
	zoom: 12,
	layers: [osm2]
});

// ---------------------------------------------------------------
// Estilo de los puntos en el formato GeoJSON
//var geojsonMarkerOptions = {
//	radius: 6,
//	color: "#f00",
//	opacity: 1,
//	weight: 1,
//	fillColor: "#f00",
//	fillOpacity: 1
//};

//var geojsonMarkerOptionsEmpty = {
//	fill: false,
//	stroke: false
//};

// ---------------------------------------------------------------
// Estilo de las líneas
var estilo_linea = {
    "color": "#ff0000",
    "weight": 3,
    "opacity": 1
};

// ---------------------------------------------------------------
// Estilo de los polígonos
var estilo_poligono = {
    "color": "#00ff00",
    "weight": 3,
    "opacity": 0.65
};

// ---------------------------------------------------------------
// Actividades después un click al punto

// ---------------------------------------------------------------
// Actividades después un click a la línea
//function onEachFeatureLi(feature, layer) {
//	if (feature.properties && feature.properties.nombre) {
//		html_content = "<b>" + feature.properties.nombre + "</b><br/>";
//		
//		if (feature.properties.text) {
//		  html_content +=  feature.properties.text + "<br/>";
//		}

//		if (feature.properties.link) {
//		  link_feature = feature.properties.link;
//		  html_content +=  link_feature.link(feature.properties.link) + "<br/>";
//		}
		
//		if (feature.properties.copyright) {
//		  html_content += "<cp>&#0169 " + feature.properties.copyright + "</cp><br/>";
//		}
		
//		var imgname = feature.properties.fichero;
				
//		html_content += "<a href='./images/"  + imgname + ".jpg' target='_blank'><img src='./images/" + imgname + ".jpg' width=200px onerror='this.src=\"./images/0.jpg\"; this.style.display = \"none\";'/></a>";

//		layer.bindPopup(L.popup({maxWidth:200}).setContent(html_content, { autoPan: true}));
//		layer.bindLabel(feature.properties.nombre, { className: "myLabel", noHide: false});
//	}
//}

// ---------------------------------------------------------------
// Actividades después un click al polígono
//function onEachFeaturePo(feature, layer) {
//	if (feature.properties && feature.properties.nombre) {
//		html_content = "<b>" + feature.properties.nombre + "</b><br/>";
		
//		if (feature.properties.text) {
//		  html_content +=  feature.properties.text + "<br/>";
//		}

//		if (feature.properties.link) {
//		  link_feature = feature.properties.link;
//		  html_content +=  link_feature.link(feature.properties.link) + "<br/>";
//		}
		
//		if (feature.properties.copyright) {
//		  html_content += "<cp>&#0169 " + feature.properties.copyright + "</cp><br/>";
//		}
		
//		var imgname = feature.properties.fichero;
				
//		html_content += "<a href='./images/"  + imgname + ".jpg' target='_blank'><img src='./images/" + imgname + ".jpg' width=200px onerror='this.src=\"./images/0.jpg\"; this.style.display = \"none\";'/></a>";

//		layer.bindPopup(L.popup({maxWidth:200}).setContent(html_content, { autoPan: true}));
//		layer.bindLabel(feature.properties.nombre, { className: "myLabel", noHide: false});
//	}
//}


// ---------------------------------------------------------------
// Vizualización de las líneas
var lineas = L.geoJson(json_cuenca_rios_1, {
    style: estilo_linea
	,	
//	onEachFeature: function(feature, layer) {
//        layer.bindLabel(feature.properties.nombre,{ className: "myLabel", noHide: true});
//    },
//	onEachFeature: onEachFeatureLi
}).addTo(map);

// ---------------------------------------------------------------
// Vizualización de los polígonos
//var poligonos = L.geoJson(json_cuenca_suavizada_0, {
//    style: estilo_poligono
//	,
//	onEachFeature: function(feature, layer) {
//        layer.bindLabel(feature.properties.nombre,{ className: "myLabel", noHide: true});
//    },
//	onEachFeature: onEachFeaturePo
//}).addTo(map);


// ---------------------------------------------------------------
// Selección del mapa al fondo y del rótulo
var baseLayers = {
	"OpenStreetMap": osm2,
//    "Orthophoto": wms_dop_laiv,
 	"Sin mapa": osm_leer
};
var overlays = {
	"R&#243tulo": geojsonLabel
}
L.control.layers(baseLayers, overlays).addTo(map);

// ---------------------------------------------------------------
// Leyanda
function getColor(d) {
         return d == 'R&#237os' ? "#005080" :
                d == 'Cuenca' ? "#32cccc" :
				"#000000";
     }
	 
var leyenda = L.control({position: 'bottomleft'});
    leyenda.onAdd = function (map) {
	
    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Leyenda</strong><br>' + 'ABC:'],
    categories = ['R&#237os','Cuenca'];

    for (var i = 0; i < categories.length; i++) {
            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));
        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    leyenda.addTo(map);
