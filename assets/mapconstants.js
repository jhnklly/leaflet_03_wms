// The document url without params
//var BASE_URL = document.URL.split('?')[0]; 
var BASE_URL = document.URL.split('#')[0]; 

// Doc url without filename
BASE_URL = BASE_URL.substring(0, BASE_URL.lastIndexOf('/') + 1);

// array.slice(start, [end])
var SUB_DIR = BASE_URL.split('/').slice(3).join('/');

// var START_BOUNDS = [[37.4,-122.6],[38.1,-121.9]]; // SF Bay Area
var START_BOUNDS = [[32.53,-124.43],[42,-114.13]]; // Calif.
var START_BASEMAP = 'terrain';

//var WMSURL = "/cgi-bin/mapserv?map=/maps/" + 'greeninfo/staff/jk/mapbox/03-xyz-wms' + "/wms/map.map";
var WMSURL = "/cgi-bin/mapserv?map=/maps/" + SUB_DIR + "/wms/map.map";

var BASEMAPS = [
    {
        button:'nps',
        url:'http://a.tiles.mapbox.com/v3/nps.pt-shaded-relief,nps.pt-urban-areas,nps.pt-river-lines,nps.pt-admin-lines,nps.pt-hydro-features,nps.pt-roads,nps.pt-road-shields,nps.pt-hydro-labels,nps.pt-city-labels/{z}/{x}/{y}.png',
        //url:'http://tilestache-cdn-1.greeninfo.org/tilestache/tilestache.py/basemap_cpadlight_nolabels/{z}/{x}/{y}.jpg',
        //url:'http://tilestache-cdn-1.greeninfo.org/tilestache/tilestache.py/basemap_withlabels/{z}/{x}/{y}.jpg',
        attrib:'Map tiles by <a target="_blank" href="http://www.nps.gov">NPS</a>.<br />Data &copy; <a target="_blank" href="http://openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
    },
    {
        button:'satellite',
        url:'http://{s}.tiles.mapbox.com/v3/greeninfo.map-zudfckcw/{z}/{x}/{y}.jpg',
        attrib:'Map tiles by <a target="_blank" href="http://www.mapbox.com">MapBox</a>.<br />Data &copy; <a target="_blank" href="http://openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
    },
    {
        button:'terrain',
        //url:'http://{s}.tiles.mapbox.com/v3/greeninfo.map-3x7sb5iq/{z}/{x}/{y}.jpg',
        url:'http://services.arcgisonline.com/arcgis/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png',
        attrib:'Map tiles by <a target="_blank" href="http://www.esri.com">esri</a>.'
    },
    {
        button:'cpad',
        //url:'http://tilestache-cdn-1.greeninfo.org/tilestache/tilestache.py/basemap_cpadlight_nolabels/{z}/{x}/{y}.jpg',
        url:'http://tilestache-cdn-1.greeninfo.org/tilestache/tilestache.py/basemap_nolabels/{z}/{x}/{y}.jpg',
        //url:'http://tilestache-cdn-1.greeninfo.org/tilestache/tilestache.py/basemap_withlabels/{z}/{x}/{y}.jpg',
        attrib:'Map tiles and parks data by <a target="_blank" href="http://www.greeninfo.org">GreenInfo Network</a>.<br />Streets data by <a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }
];


// a global labels layer
//LABELS = null;
//LABELS = 'http://{s}.tiles.mapbox.com/v3/greeninfo.map-qwnj26en/{z}/{x}/{y}.png';
var LABELS = 'http://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}.png';

var MAPLAYERS = {};

MAPLAYERS.my_wms = L.tileLayer.wms(WMSURL, {
        format: 'image/png',
        transparent: true,
        layers: 'polygons'
    });