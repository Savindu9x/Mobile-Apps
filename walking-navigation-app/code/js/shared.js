'use strict'
/*
* Last Edited by pasan @ 3.00 pm 14th Of May.
*
* Contains all information needed by both mainPage.js and navigate.js
* 
* Creates pathInstance and pathlistInstance.
*
*
*/

 // create path instance for each of the paths in the array
class Path
	{
		// creating constructor 
		constructor()
		{
		//declaring private attributes
		this._locations = [];
            this._title = "";
			this._turns = null;
			this._distance = null;
		}
	
              //public methods

      // Gives the title
        get title()
        {
            return this._title;
        }
     // Gives the location
        get locations()
        {
            return this._locations;
        }
     // Gives turns
        get turns()
        {
            return this._turns;
        }

	  intializeFromPathPDO(PathObj)
		{
			this._locations = PathObj.locations;
			this._title = PathObj.title;
            //console.log(PathObj.title);
		}
		// Calculating the total distance and number of turns per each path.
		calDistance()
		{
			let distanceOfWayPoints = 0;
			for (let i=1; i<this._locations.length;i++)
				{
					let wayPointA = new google.maps.LatLng(this._locations[i-1]);
					let wayPointB = new google.maps.LatLng(this._locations[i]);
					distanceOfWayPoints += google.maps.geometry.spherical.computeDistanceBetween(wayPointA,wayPointB);
				}
		 return this._distance = distanceOfWayPoints.toFixed(2);
			 
			
		}
		turns()
		{
		    this._turns = this._locations.length-1;
		}
	}


class PathList 
	{
		constructor(type)
		{
		// Two private attributes
		this._listOfPath = [];
		this._pathType = type;
		}

           // Public Methods
           
    // gives the list of paths
       get listOfPath()
          {
			  return this._listOfPath;
		  }
	// gives the type of path
		get type()
		{
			return this._pathType;
		}

		
	intializeFromPathListPDO(PathObj)	
		{
			for(let j=0; j<PathObj.length;j++)
				{
					let path = new Path();
					path.intializeFromPathPDO(PathObj[j]);
					path.calDistance();
					path.turns();
					this._listOfPath.push(path);
				}
		}

	}
