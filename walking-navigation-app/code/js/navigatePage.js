let pathKEY = "path_Storage";
let pathIndex = localStorage.getItem(pathKEY + "-selectedPath");
let monashRoutes =  JSON.parse(localStorage.getItem(pathKEY));
let availablePaths = monashRoutes[0]._listOfPath;

if (pathIndex !== null)
{
    // If a path index was specified, show name in header bar title. This
    // is just to demonstrate navigation.  You should set the page header bar
    // title to an appropriate description of the path being navigated
    document.getElementById("headerBarTitle").textContent = availablePaths[pathIndex]._title;
}
  
        
   let positionOptions = 
    {
        highAccuracy: true,
        timeout: 60000,
        maximumAge: 0
    };

// Previous coordinate
let previousCd =
    {
        lat: undefined,
        lng: undefined
    };

// Current coordinate
let currentCd =
    {
        lat: undefined,
        lng: undefined
    };

// Movement history
let historyMove = 
    {
        coordinates: [],
        time: []
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

// To determine if the user is on navigation
 

// Listing out all the functions needed 
// To display the map. Will be called when Maps API loads
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
		
        let timestamp = position.timestamp;
        historyMove.coordinates.push(currentCd);
		console.log(historyMove.coordinates)
        historyMove.time.push(timestamp);
		console.log(historyMove.time)
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

		currentPs = new google.maps.LatLng(currentCd);
		 accuracy = position.coords.accuracy
		 // If the previous position of the user is not determined, the position of the user will be determined as current position
         if (previousCd.lat === undefined && previousCd.lng === undefined)
        {
	        previousCd.lat = currentCd.lat;
            previousCd.lng = currentCd.lng;
            previousPs = new google.maps.LatLng(previousCd); 
            accuracy = position.coords.accuracy;
            bearing = position.coords.heading;
        }
		
    else 
        {
            previousCd.lat = currentCd.lat;
            previousCd.lng = currentCd.lng;
            previousPs = new google.maps.LatLng(previousCd);
            accuracy = position.coords.accuracy;
            bearing = google.maps.geometry.spherical.computeHeading(previousPs, currentPs);
        }

		drawCircle();
		drawMarker();
		drawPath();
		storeMovement();
		navigate();
	}
        
            
function error()
{
    displayMessage("Your location is not detected");
}

function drawMarker()
{
	if (marker === null)
        {
            
            marker = new google.maps.Marker
            ({
                map: map,
                position: currentCd,
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
		
}

function drawCircle()
{
	 if (accuracyCircle === null)
        {
            accuracyCircle = new google.maps.Circle
            ({
                map: map,
                center: currentCd,
                fillColor: '#FF0000', // Colour of the circle is light red
                fillOpacity: 0.35,
                strokeColor: '#FF0000', // Colour of stroke is red
                strokeOpacity: 0.8,
                strokeWeight: 2,
                radius: accuracy   
            });
        }
	else (accuracyCircle !== null)
	{
		
            accuracyCircle.setMap(null);
             accuracyCircle = new google.maps.Circle
            ({
                map: map,
                center: currentCd,
                fillColor: '#FF0000', // Colour of the circle is light red
                fillOpacity: 0.35,
                strokeColor: '#FF0000', // Colour of stroke is red
                strokeOpacity: 0.8,
                strokeWeight: 2,
                radius: accuracy   
            });   
        
	}
	
}

function drawPath()
{

    let walkCoords = availablePaths[pathIndex]._locations;
    if (walkPath === null)
        {
            walkPath = new google.maps.Polyline
            ({
                path: walkCoords,
                geodesic: true,
                strokeColor: '#1E90FF',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
        }
    if (walkPath !== null)
        {
            walkPath = new google.maps.Polyline
            ({
                path: walkCoords,
                geodesic: true,
                strokeColor: '#1E90FF',
                strokeOpacity: 1.0,
                strokeWeight: 2   
            });
        }
	walkPath.setMap(map);
}
	
function storeMovement()
{
     navigator.geolocation.getCurrentPosition(function(position){
        let coordinate = 
            {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        let timestamp = position.timestamp;
        historyMove.coordinates.push(coordinate);
        historyMove.time.push(timestamp);
    });
}

let nextMove = document.getElementById("nextDirection");
let nextMoveImg = document.getElementById("nextMoveImg");
// Display all the navigation info to the user
function navigate()
    {
        // To determine the distance between the waypoint user at to the other waypoints
        let waypoint;
        let waypointDistance = [];
        for (let i = 0; i < availablePaths[pathIndex]._locations.length; i++)
            {
                waypoint = new google.maps.LatLng(availablePaths[pathIndex]._locations[i]);
                // Calculate the distance between waypoints
                waypointDistance[i] = google.maps.geometry.spherical.computeDistanceBetween(currentPs,waypoint);
            }
        
        // To determine which of the waypoints is the nearest to user's waypoint
        for (let i =0; i < availablePaths[pathIndex]._locations.length; i++)
            {
                // Determine the closest waypoint to ther user
                if (waypointDistance[index-1] > waypointDistance[i])
                    {
                        index = i;
                    }
            }
        
        // To determine if the user has reached the next waypoint
        if (waypointDistance[index] <= accuracy)
            {
                index ++; 
            }
        
        // To determine if the user has finally reached the destination
        if (index === availablePaths[pathIndex]._locations.length-1 && waypointDistance[index-1] <= accuracy) 
            {
                // Inform the user that he/she has reached the destination by displaying a message
                if (window.confirm ("You have finally reached your destination! Press OK to return to Homescreen.")) 
                    { 
                        // Bring the user to homepage when he/she has reached the destination 
                        window.location.href = 'index.html';
                    }
                
                // Navigation completed and end
                watchID = false;
            }
        
        // Calculate the remaining distance to the next waypoint
        let nextWaypoint = document.getElementById("nextWaypointDistance");
        nextWaypoint.innerText = "Distance To Next Way Point : " + waypointDistance[index-1].toFixed(2) + " m";
        
        // Declare the variables needed
        let walkCoords = new google.maps.LatLng(availablePaths[pathIndex]._locations[index]);

        // Determine the next waypoint
        // infoWindow is a global variable declared on the above
        if (infoWindow !== null && infoWindow !== undefined)
             {
                infoWindow.setMap(null);
             }
            
        infoWindow = new google.maps.InfoWindow
            ({
                position: walkCoords,
                content: "Next Waypoint",
                disableAutoPan: true,
            });
        
        // To open up the map
        infoWindow.open(map);
        
        // To determine the distance left for the user to reach the destination
        let distBetwWaypoints = 0;
        let waypointIndex;
        for (let i = index; i < availablePaths[pathIndex]._locations.length-1; i++)
            {
                waypointIndex = i;
                let point1 = new google.maps.LatLng(availablePaths[pathIndex]._locations[waypointIndex]);
                let point2 = new google.maps.LatLng(availablePaths[pathIndex]._locations[waypointIndex+1]);
                distBetwWaypoints += google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
            }
        
        // Calculate and display the remaining distance to reach the destination
        let remainDistance;
        let distanceLeft = document.getElementById("distanceToDestination");
        remainDistance = distBetwWaypoints + waypointDistance[index]
        distanceLeft.innerText = "Remaining Distance left to Destination: " + remainDistance.toFixed(2) + "m";
        
        // To determine and show the direction to guide the user to the next waypoint till the destination
       
        waypointBearing = google.maps.geometry.spherical.computeHeading(currentPs, walkCoords);
        let pathBearing;
        pathBearing = waypointBearing - bearing;
        
        // Guide the user to destination
       
        // Reqquest the user to continue to walk straight
       if (pathBearing <= 5 && pathBearing >= -5)
            {
                nextMove.innerText = "Continue walk straight";
                nextMoveImg.src = "images/straight.svg";
            }
        // Request the user to turn left
        else if (pathBearing <= -85 && pathBearing >= -95)
            {
                nextMove.innerText = "Turn left";
                nextMoveImg.src = "images/left.svg";
            }
        // Request the user to walk slightly left
        else if (pathBearing < -5 && pathBearing > -85)
            {
                nextMove.innerText = "Walk slightly left";
                nextMoveImg.src = "images/slight_left.svg";
            }
        // Request the user to turn right
        else if (pathBearing >= 85 && pathBearing <= 95)
            {
                nextMove.innerText = "Turn right";
                nextMoveImg.src = "images/right.svg";
            }
        // Request the user to walk slightly right
        else if (pathBearing > 5 && pathBearing < 85)
            {
                nextMove.innerText = "Walk slighty right";
                nextMoveImg.src = "images/slight_right.svg";
            }
        // Request the user to make a U-turn 
        else
            {
                nextMove.innerText = "Make a U-turn";
                nextMoveImg.src = "images/uturn.svg";
            }
        
        // Determine the user's total distance travelled
        let distanceTravelled;
        distanceTravelled = 0;
        let pathDistance = document.getElementById("walkedDistance");
        for (let i = 0; i < historyMove.coordinates.length; i++)
            {
                let pointI = new google.maps.LatLng(historyMove.coordinates[i]);
                let pointF = new google.maps.LatLng(historyMove.coordinates[i+1]);
                
                // Calculate the distance travelled 
                distanceTravelled += google.maps.geometry.spherical.computeDistanceBetween(pointI,pointF);
                
                // This is the condition where total distance travelled cannot be determined
                if (historyMove.coordinates.length === 0 || historyMove.coordinates.length === 1)
                    {
                        pathDistance.innerText = "Total Distance travelled: Cannot be detected.";
                    }
                // Else the distance will be calculated and displayed
                else
                    {
                        pathDistance.innerText = "Total Distance Travelled: " + distanceTravelled.toFixed(2) + "m";
                    }   
            }
		
		 // Determine the user's average speed for the path
        let timeDiff;
        let averageSpeed;
        let howFast = document.getElementById("speed");
        for (let i = 0; i < historyMove.coordinates.length; i++)
            {
                 // Calculate and show the average speed.
                 timeDiff = (historyMove.time[i] - historyMove.time[0])/1000;
                 averageSpeed = distanceTravelled/timeDiff;
                 if (historyMove.coordinates.length === 0 || historyMove.coordinates.length === 1 || distanceTravelled === 0)
                        {
                            howFast.innerText = "Speed: Cannot be detected."
                        }
                    else
                        {
                            howFast.innerText = "Speed: " + averageSpeed.toFixed(2) + "m/s";
                        }
            }
        
        // Estimate the time for the user to reach destination
        let timeNeeded = document.getElementById("arrivalTime");
        let eta;
        eta = remainDistance/averageSpeed;
        if (historyMove.coordinates.length === 0 || historyMove.coordinates.length === 1 || distanceTravelled === 0)
            {
                timeNeeded.innerText = "Estimated Arrival Time: Cannot be detected.";
            }
        else
            {
                let minutes = Math.floor(eta/60);
                let seconds = Math.floor(eta - min * 60);
                timeNeeded.innerText = "Estimated Arrival Time: " + minutes + " min " + seconds + " s ";
            } 
    }
