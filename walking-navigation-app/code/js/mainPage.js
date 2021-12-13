'use strict'
/* Edited by Pasan Savindu @ 1.00 am on 13th of May.
*
* This page contacts the navigation web service and 
* Store the path data in Local storage in later access
* from mainpage and Navigation page.
* 
* Linked in with index.html and navigation.html
* 
*/

//Defining a Key to call and global variables.
let pathKEY = "path_Storage";
let pathDataStr;
let parsedData;
let availablePaths = [];

// make the request.
 let data = {
	 campus: "sunway",
	 callback: "getDataFromWebServer"
            };
 let url = "https://eng1003.monash/api/campusnav/";


			 
function jsonpRequest(url,data)
{
   // Build URL parameters from data Object.
	let parameters = "";
	// For Each key in data Object...
	for (let key in data)
		{
			if(data.hasOwnProperty(key))
				{
				 if(parameters.length ===0)
				     {
				 // First parameter starts with '?'
					parameters += "?";
				     }
			else
				      {
				//Subsequently parameter separated by '&'
					   parameters += "&";
				      }
			let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);
                   
			
			parameters += encodedKey + "=" + encodedValue;
		         }
        }
		let script = document.createElement('script');
        script.src = url + parameters;
        document.body.appendChild(script);
}


   
    // contact navigation web service
     jsonpRequest(url,data);
	
//callback function of navigation web service calling
function getDataFromWebServer(pathData)
{
        if(typeof(Storage) !== "undefined")
	     {
		   // store pathData
            	pathDataStr = JSON.stringify(pathData);
            	localStorage.setItem(pathKEY,pathDataStr);
	      }
    	else
	    	{
		     alert("localStorage is not supported by current Browser.");
	    	}
	
        if(typeof(Storage) !== "undefined")
	     {
		   // create an array and push path instance into the array
		    pathDataStr = localStorage.getItem(pathKEY);
	     	parsedData = JSON.parse(pathDataStr);
	     }
	        // create a pathlist instance and assign value of "server" into the private attribute pathType
	        	 let pathlistObj = new PathList("Server");
        	// assign the array of path instances as the value of private attribute of pathList Instance
		          pathlistObj.intializeFromPathListPDO(parsedData);
	

           // create another array of pathlist instance
                let pathListArray = [pathlistObj,null];

           // store the pathListArray into local storage 
             if (typeof(Storage) !== "undefined")
        	 {
	        	 localStorage.clear();
	        	 let pathListArrayStr = JSON.stringify(pathListArray);
	        	 localStorage.setItem(pathKEY,pathListArrayStr);
	         }
	retriveDataAndDisplay();  
}
 
 // call the retriveDataAndDisplay 
function retriveDataAndDisplay()
{
    // get item and display into index.html
     let pathListArrayStr = localStorage.getItem(pathKEY);
     let monashRoutes =  JSON.parse(pathListArrayStr);
     
    // Get available path into an array 
    availablePaths = monashRoutes[0]._listOfPath;
    // display my path information in multiple rows 
  
	 for (let i=0; i<availablePaths.length; i++)
            {
     let outputAreaRef1 = document.getElementById("distance" + (i+1));
         outputAreaRef1.innerHTML = availablePaths[i]._distance + " m";
     let outputAreaRef2 = document.getElementById("turns" + (i+1));
         outputAreaRef2.innerHTML = availablePaths[i]._turns + " m";
           }
    
}
 
function viewPath(pathIndex)
{
 // Save the selected path index to local storage so it can be accessed
 // from the Navigate page.
 localStorage.setItem(pathKEY + "-selectedPath", pathIndex);
 // ... and then load the Navigate page.
 location.href = 'navigate.html';
} 
    
    
    