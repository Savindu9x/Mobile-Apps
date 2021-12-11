/**
 * Your header documentation here for _listen
 *    For your reference...
 * 		event will hold an Event object with the pixels in
 *   	event.detail.data and the timestamp in event.timeStamp
 */

// Step 01
   // Creating an array for tapCode

let tapCode = [["e", "t", "a", "n", "d"],
		       ["o", "i", "r", "u", "c"],
		       ["s", "h", "m", "f", "p"],
		       ["l", "y", "g", "v", "j"],
	   	       ["w", "b", "x", "q", "z"]];

// Initialize the global Variables

let string = "";
let black = 0;
let white = 0;
let change = 0;
let bollyn = true;
let row=0,column=0;
let rxcodeRef = document.getElementById("rx-code");
let rxtranslatedRef = document.getElementById("rx-translated");

_listen = function(event)
{

// Step 02 
   let dataPixels = event.detail.data; // Receiving the RGB array
   let grayScale = 0;                  // Defining a new array
	
      // Obtaining the grayscale for each Pixel.
   for (i = 0; i < dataPixels.length/4; i++)
    {
    let redValue = dataPixels[4*i];
    let greenValue = dataPixels[4*i+1];
    let blueValue =  dataPixels[4*i+2];
    
    grayScale += (redValue + greenValue + blueValue)/3;

    }
    
// Step 03                                                                                                 
    if (grayScale < 180) // Setting threshold value to 180
    { 
		// calculate the duration of flash
        if (!bollyn)
            {
                change = white - change;// Calculating the change in time (final time - initial time)
                string += "*";
                bollyn = true;
            }
       
        if (string !== "") // If not, it will stamp the time at the black space
            {
         black = event.timeStamp;
            }
    }
//Step 04   
    else
    {  
	// Determine whether it's a full or half gap using time duration
         if (white !== 0 && black!== 0)
          {   
             let difference = black - white ; 
             console.log("difference:"+difference)
             ratio = (difference /change);
             console.log ("ratio:"+ ratio)
	// According to the ratio, this shows that it is half gap.
         if (ratio < 1.5)
             {
                 string += "";
                 white = 0;
                 black = 0;
             }
			  
         // According to the ratio, this shows that it is a full gap.
         if (ratio >=1.5 && ratio <= 5)
             {
                 string += " ";
                 white = 0;
                 black = 0;
             }
    
        }
        white = event.timeStamp;
        if (bollyn)
            {
                change = white;
                bollyn = false;
                
            }
    }
    console.log (string); 
};

/**
 * Your header documentation here for clear
 */
clear = function()
{
    // Using clear method so the app can run multiple times without needing to reload the page
black = 0;white = 0;
change = 0;
bollyn = true    
row = 0, column = 0;
string = "";
rxcodeRef.innerHTML = "";
rxtranslatedRef.innerHTML = "";

	
};

/**
 * Your header documentation here for translate
 */
translate = function()
{
     let sepString = string.split(" ");  // Storing coded message as separate elements
     console.log(sepString); 
     
//Step 06 
    if (sepString.length%2==1) // finding a incomplete message using Remainder
    {
     alert("ERROR! FULL PROCESS NOT EXECUTED");
    }
 
 
    let translatedString =" ";
	
    for (let i=0; i<sepString.length ; i+=2)
     {
	   row =  sepString[i].length;
	   column =  sepString[i+1].length;
		 
       translatedString += tapCode[row-1][column-1];
	   console.log(translatedString);
	 }
//Step 07		 
    // Since 'k' and space need to be define using special combination of alphabet
    translatedString = translatedString.replace(/qc/g,"k");
    translatedString = translatedString.replace(/wuw/g," ");
    
//Step 08 
	
	// Define “rx-translated” and “rx-code” 
		
     let rxcodeRef = document.getElementById("rx-code");
     let rxtranslatedRef = document.getElementById("rx-translated");

   // Display message for the converted and coded versions of the
  //message respectively
rxcodeRef.innerHTML = string;
rxtranslatedRef.innerHTML = translatedString;
};
