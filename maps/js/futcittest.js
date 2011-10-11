
var interval= 200;


var BARCELONA= new google.maps.LatLng( 41.40215, 2.20050);

function Bus( params){
    var _id= undefined;
    var self= this;
    
    var _radius= 0;
    var scale= 100;
    var _degrees= 0;
    var _currentStep= 0;
    var MAX_STEPS= 40;
    var ORIGINAL_POSITION= BARCELONA;
    
    var _marker= null;
    
    self.init= function( params){
        if( params.hasOwnProperty( 'id'))
            _id= params.id;
        if( params.hasOwnProperty( 'max_steps'))
            MAX_STEPS= params.max_steps;
        if( params.hasOwnProperty( 'map'))
            _map= params.map;
        
        _radius= _id+1;
        _degrees= Math.floor( 360/MAX_STEPS );
        _currentStep= 0;
        
        var point= computePosition();
        
        _marker= new google.maps.Marker({
              map: _map,
              position: point,
              icon: 'http://maps.gstatic.com/mapfiles/ms2/micons/bus.png',
              flat: true,
              title: "Marca "+ _radius
            });
        
    }

    function computePosition(){
        var position= google.maps.geometry.spherical.computeOffset( ORIGINAL_POSITION, _radius*scale, _currentStep*_degrees);
        // console.log( "position: %s %o", log(), position);
        return position;
    }
    
    self.resetAnimation= function(){
        _currentStep= 0;
    }
    
    self.animate= function( ){
        setTimeout( 
          function(){
              self.getNextPosition();
              self.redraw();
              self.animate();
          },
          interval*_radius
        );
    }
    
    self.getNextPosition= function(){
        ++_currentStep;
        _currentStep= (_currentStep% MAX_STEPS);
        
        // console.log( "next "  + log());
    }
    
    function log(){
        return "(" + _id + "," + _currentStep + ")";
    }

    self.redraw= function(){
        // console.log( "redraw " + log());
        _marker.setPosition( computePosition());
    }
    self.init( params);
}

function initialize(){
    // var BARCELONA= { lat: 41.40215, long: 2.20050 };

    var myLatlng = BARCELONA;

    var myOptions = {
      zoom: 11,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    const KML_ANTENAS= 'http://serotonin.tid.es/barcelona_antenas.kml';

    var ctaLayer = new google.maps.KmlLayer( KML_ANTENAS);
    ctaLayer.setMap(map);

    const KML_HEATMAP= 'http://serotonin.tid.es/barcelona_heatmap.kml';

    var ctaLayer2 = new google.maps.KmlLayer( KML_HEATMAP);
    ctaLayer2.setMap(map);
    
    var MAX_BUSES= 100;
    for( var i=0; i< MAX_BUSES; i++){
        var b= new Bus( { id: i, map: map, max_steps: 40});
        
        b.animate( b);
    }
    
}
