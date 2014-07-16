$(document).ready(function () {
    initMap();
});


function initMap() {
    var zindex = 10;
    
    MAP = L.map('map', {
        // options...
    });

    
    // create the basemaps and replace BASEMAPS with this new random-access assoc
    // also populate the list used in the basemap toggle control below
    var basemapbuttons = [];
    var b = {};
    for (var i=0, l=BASEMAPS.length; i<l; i++) {
        var url = BASEMAPS[i].url;
        var att = BASEMAPS[i].attrib;
        var tag = BASEMAPS[i].button;

        b[tag] = L.tileLayer(url, { attribution:att });
        basemapbuttons.push(tag);
    }
    BASEMAPS = b;
    BASEMAP_CONTROL = new L.Control.BasemapBar({ layers:basemapbuttons }).addTo(MAP);

    // select the default basemap, then zoom to the starting view
    selectBasemap(START_BASEMAP);
    
    MAP.fitBounds( L.latLngBounds(START_BOUNDS) );

    /*
    for (var i=0, l=CONTEXT_LAYERS.length; i<l; i++) {
        var wmslayer   = CONTEXT_LAYERS[i].wmslayer;    // string, the WMS layer name as listed in the mapfile
        var clickquery = CONTEXT_LAYERS[i].clickquery;  // boolean, should this layer support click-query? that's a different WMS subclass
        var config     = { layers:wmslayer, tileSize:2048, format:'image/png', transparent:true, zIndex:zindex++ };

        MAPLAYERS[wmslayer] = clickquery ? L.tileLayer.wmsWithFeatureInfo(WMSURL_CONTEXT,config) : L.tileLayer.wms(WMSURL_CONTEXT,config);
        MAPLAYERS[wmslayer].on('loading', function () { layerShowSpinner(this.options.layers); })
                           .on('load', function () { layerHideSpinner(this.options.layers); });
    }
    */

    

    L.control.fullscreen({}).addTo(MAP);
    var hash = L.hash(MAP);
    //L.control.locate().addTo(MAP);

    for (layername in MAPLAYERS) {
        MAP.addLayer( MAPLAYERS[layername] );
    }

    if (LABELS) {
        L.tileLayer(LABELS,{ zIndex:zindex++ }).addTo(MAP);
    }

} // end initMap

function selectBasemap(which) {
    BASEMAP_CONTROL.selectLayer(which);
    //MAP.addLayer(BASEMAPS[which]);
}

$(function(){
    // Try sans-jquery...
    var gincred = document.createElement('div');
    gincred.setAttribute("id", "ginCreditsContainer");
    gincred.setAttribute("title", "Interactive mapping by GreenInfo Network");
    var gincred_spans = '<span id="ginCreditsText" style="display:none;">' +
                        'Interactive mapping<br>by <a target="_blank" href="http://www.greeninfo.org/">GreenInfo Network</a>' +
                    '</span> <span id="ginCreditsLogo">' +
                    '<img id="ginLogo" src="assets/images/greeninfo.png" alt="GreenInfo Network" />' +
                    '</span>';
    gincred.innerHTML = gincred_spans;
    document.getElementById('map').appendChild(gincred);

    // jquery crutch
    $('#ginCreditsContainer').hover(function(){
        $('#ginCreditsText').toggle(); 
    });
});