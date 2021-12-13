// If a path index was specified, show name in header bar title. This
    // is just to demonstrate navigation.  You should set the page header bar
    // title to an appropriate description of the path being navigated
    document.getElementById("headerBarTitle").textContent = "Your Route";

        
 let positionOptions = 
    {
        highAccuracy: true,
        timeout: 60000,
        maximumAge: 0
    };


// Current coordinate
let currentCd =
    {
        lat: undefined,
        lng: undefined
    };



// Declaring the global variables
let map = null;
let marker = null;
let previousPs; // previous position
let currentPs; // current position
let bearing = null;
let accuracy = null;
let accuracyCircle = null;
let walkPath = null;
let index = 0;
let infoWindow;
let lat = [];
let lng = [];

function initMap()
{
    // Initialise map and locate user position
	if (navigator.geolocation)
    watchID = navigator.geolocation.watchPosition(onSuccess,error,positionOptions);

	  
	
}
function onSuccess(position)
	{
            currentCd = {
                  lat : position.coords.latitude,
                  lng : position.coords.longitude
                         }

            if (map === null)
                    {
                        map = new google.maps.Map(document.getElementById("map"),
                            {
                                center: currentCd,
                                zoom: 18,
                                streetViewControl: false,
                                mapTypeControl: true,
                            });
                    }
        drawMarker();
        
    }
            /* if u want tp add some function to work on the map, add to here. I have commented the drawmarker() and drawCircle() ******************
            ************************************************/
           
        
        
        
        
 /*       function setPoints(coords){
         let marker = new google.maps.Marker({
            position: coords, // current location
            map: map,
            draggable: true,
            });

            //stores the coordinates of the user-selected point in an array
        selectedPoints.push(marker.coords);
        } 

        google.maps.event.addListener(map,'click',function(event){
            setPoints(event.latlng);
        });

        function deleteLastSetPoints(selectedPoints){
            selectedPoints.pop();
        } 

        function deleteAllSetPoints(selectedPoints){
            selectedPoints = null;
        }
        function savePath(selectedPoints){
           /////
        }

	}
*/


function error()
{
    displayMessage("Your location is not detected");
}

// initializing the marker 
function drawMarker(position)
{
	if (marker === null)
        {
            
            marker = new google.maps.Marker
            ({
                map: map,
                position: position,
                draggable: true,
                icon:
                {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: '#00FFFF', // Colour of marker is aqua
                    fillOpacity: 0.8,
                    scale: 4,
                    strokeColor: '#000000', // Colour of stroke is black
                    strokeWeight: 2,
                    rotation: parseInt(bearing)  
                }
            });
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() 
                {   
                    marker.setAnimation(null);
                }, 2000);
        }
	else if (marker !== null)
		{
			
            marker.setMap(null);
            marker = new google.maps.Marker({
                map: map,
                position: currentCd,
                draggable: true,
                icon:
                {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: '#00FFFF', // Colour of marker is aqua
                    fillOpacity: 0.8,
                    scale: 4,
                    strokeColor: '#000000', // Colour of stroke is black
                    strokeWeight: 2,
                    rotation: parseInt(bearing)  
                }
            });
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() 
                {   
                    marker.setAnimation(null);
                }, 2000);
        }
    // getting the coordinates of the selected points
     google.maps.event.addListener(marker, 'dragend', function () {
            console.log(marker.getPosition().lat());
            console.log(marker.getPosition().lng());
        });
}


console.log(lat);
console.log(lng);