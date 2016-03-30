    var lat=[];
    var lon=[];
    var ids=[];
    var names=[];
    var map;
    var iconBase='https://maps.google.com/mapfiles/kml/shapes/';
    var defaultLatLng;
    var marker;
    var id_map;
      getCordinates();
    $(document).on( "pageshow", "#id_1", function ( e, ui ) { 
	 
     
     $("#carusel-sliderid_1").owlCarousel({
   items:5,
    lazyLoad : true,
    goToFirstSpeed : 2000,
    autoPlay : 3000,
    paginationSpeed : 1000,
    transitionStyle:"fade"
  });
  
  	
      
    defaultLatLng = {lat:parseFloat(lat[0]), lng:parseFloat(lon[0])};  
   
   drawMap(defaultLatLng,ids[0]); 
   
   $("#getDirection_"+ids[0]).on("click",function(){
	   
   setDirection(id_map, defaultLatLng);        
});
  
   });
 	
 $(document).on( "pageshow", "#id_2", function ( e, ui ) { 
     
     $("#carusel-sliderid_2").owlCarousel({
    items:5,
    lazyLoad : true,
    goToFirstSpeed : 2000,
    autoPlay : 3000,
    paginationSpeed : 1000,
    transitionStyle:"fade"
  });	
  
      
    defaultLatLng = {lat:parseFloat(lat[1]), lng:parseFloat(lon[1])};  
   
  drawMap(defaultLatLng,ids[1]);
   
$("#getDirection_"+ids[1]).on("click",function(){
   setDirection(id_map, defaultLatLng);        
});
     
 	  });
 	  
   $(document).on( "pageshow", "#id_3", function ( e, ui ) { 
     
     $("#carusel-sliderid_3").owlCarousel({
     items:5,
    lazyLoad : true,
    goToFirstSpeed : 2000,
    autoPlay : 3000,
    paginationSpeed : 1000,
    transitionStyle:"fade"
  });  
  
      
    defaultLatLng = {lat:parseFloat(lat[2]), lng:parseFloat(lon[2])};  
   
    drawMap(defaultLatLng,ids[2]);  
 $("#getDirection_"+ids[2]).on("click",function(){
   setDirection(id_map, defaultLatLng);        
});
   });	

  $(document).on( "pageshow", "#id_4", function ( e, ui ) { 
     
     $("#carusel-sliderid_4").owlCarousel({
    items:5,
    lazyLoad : true,
    goToFirstSpeed : 2000,
    autoPlay : 3000,
    paginationSpeed : 1000,
    transitionStyle:"fade"
  });    
      
    defaultLatLng = {lat:parseFloat(lat[3]), lng:parseFloat(lon[3])};  
   
    drawMap(defaultLatLng,ids[3]); 
$("#getDirection_"+ids[3]).on("click",function(){
   setDirection(id_map, defaultLatLng);        
});
       
  });
$(document).on( "pageshow", "#id_5", function ( e, ui ) { 
     
     $("#carusel-sliderid_5").owlCarousel({
	  items:5,
    lazyLoad : true,
    goToFirstSpeed : 2000,
    autoPlay : 3000,
    paginationSpeed : 1000,
    transitionStyle:"fade"
   
  }); 
      
    defaultLatLng = {lat:parseFloat(lat[4]), lng:parseFloat(lon[4])};  
   
    drawMap(defaultLatLng,ids[4]); 
  $("#getDirection_"+ids[4]).on("click",function(){
   setDirection(id_map, defaultLatLng);        
});
  });
  $(document).on( "pageshow", "#home_view", function ( e, ui ) { 
  
  $('a.back-button').prop("href","#home_view");
  
  });
  
  $(document).on( "pageshow", "#category", function ( e, ui ) { 
  
  $('a.back-button').prop("href","#category");
  
  });
  
 $(document).on( "pageshow", "#map_list", function ( e, ui ) { 
   initMap();
   addMarker(map);
	$('a.back-button').prop("href","#map_list");
	
  }); 
  

function initMap() {
	
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:51.514545 , lng:-0.141082},
    zoom: 11
  });



var marker=new google.maps.Marker({
	icon:iconBase+"man.png",
	map:map
	});



if (navigator.geolocation) {
	
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

	  
      marker.setPosition(pos);
      addMarker(map); 
     // map.setCenter(pos);
    }, function() {
      handleLocationError(true, marker, map.getCenter());
     
    });
  } else {
	 marker.setPosition({lat:51.514545 , lng:-0.141082});
	  
    // Browser doesn't support Geolocation
    handleLocationError(false, marker, map.getCenter());
    addMarker(map);
    
  }
   addMarker(map);
}

function handleLocationError(browserHasGeolocation, marker, pos) {
  
  addMarker(map);
  marker.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
 
function addMarker(_map){
	
for(var i=0; i<lat.length;i++){
var otherLatLng = {lat:parseFloat(lat[i]), lng:parseFloat(lon[i])};
console.log(parseFloat(lon[i]));
var marker=new google.maps.Marker({
	map:_map,
	position:otherLatLng
});

attachAttraction(marker, ids[i], names[i]);	
}

  }
  
function attachAttraction(marker, ids, name) {
  var infowindow = new google.maps.InfoWindow({
    content:"<h5>"+name+"</h5><a href='#"+ids+"'>"+name+"</a>"
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}  
	
	
	
	     function drawMap(latlng,id) {
		     
		  var dest; 
		     
        var myOptions = {
            zoom: 14,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         id_map = new google.maps.Map(document.getElementById("map_"+id), myOptions);
        // Add an overlay to the map of current lat/lng
        

        
			marker = new google.maps.Marker({
            position: latlng,
            map:id_map,
            
        });
        
        
        
    
    } 
	 
		  
	  
	  function getCordinates(){
	   $.ajax({
		   url:"attractionData.xml",
		   method:"GET",
		   dataType:"xml",
		   success:function(data){
			   $(data).find("attraction").each(function(index){
				  
				 
				 lon[index]=$(this).find("longitude").text();
				 lat[index]=$(this).find("latitude").text();
				 ids[index]=$(this).find("id").text();
				 names[index]=$(this).find("name").text();
				 
				 });
				 
				 
   
		
			   console.log(lat+" "+lon+" "+ids+" "+names); 
		   },
		   error:function(data){
			   console.log("Data Missing ");
		   }
		   
	   });
   }


function setDirection(_map, destination){
	
	var  pos;
	marker.setMap(null);
    _map.setZoom(10);
	        
	 if(navigator.geolocation){
	
	  navigator.geolocation.getCurrentPosition(function(position) {
       pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

	   //  var marker = new google.maps.Marker({
       //     position: pos,
       //     map: _map,
            
      // });
     // marker.setPosition(pos);
    
     
        
        
         var directionsDisplay = new google.maps.DirectionsRenderer({
           map: _map
           });

  // Set destination, origin and travel mode.
   
	 
	 var request = {
    destination:destination,
    origin: {lat:pos.lat,lng:pos.lng},
    travelMode: google.maps.TravelMode.WALKING
  };
   var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
    }
      });
});
  } 
 } 
