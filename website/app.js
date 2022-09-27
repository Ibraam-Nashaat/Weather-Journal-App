/* Global Variables */
const baseURL="https://api.openweathermap.org/data/2.5/weather?zip="; //Base URL of OpenWeatherMap API
const apiKey="&appid=e3aec68fd901b006998cdf08ebefcbc9&units=imperial"; //The API KEY

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//An Event Listener when the generate button is clicked to retrieve the temperature from the API
//then update the UI dynamically
document.querySelector('button').addEventListener('click', performAction);

function performAction(e){
// get the ZIP code from its textbox
const zipCode =  document.getElementById('zip').value; 
//get projectData object from the server
retrieveData('/data').then(function(projectData){
// get the temperature of the region using the openWeatherMap API
getWeatherStats(baseURL,zipCode, apiKey).then(function(temp)
{
// Adding the retrieved temperature, user entered feeling and the date to the projectData object
projectData.Temperature= temp;
projectData.Contents= document.getElementById('feelings').value;
projectData.Date= newDate;

// posting the previously stored data to the server 
postData('/',projectData).then(UpdateUI('/data')) // Updating the UI with the stored projectData object data
});

})};

//Gets weather stats from OpenWeatherMap API
const getWeatherStats = async (baseURL, zipCode, key)=>{

  const res = await fetch(baseURL+zipCode+key) // waiting for the API to respond
  try {

    const data = await res.json(); // changing the retrieved data to json file
    console.log(data)  
    return data.main.temp; //returning the retrieved temperature to chain promises
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

//gets projectData object from the server to store the data in it
const retrieveData=async(url)=>{
  const res= await fetch(url);
  try {
    // Transform into JSON
    const projectData = await res.json();
    return projectData;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

//Posting the stored data to the server to be stored
const postData=async(url,data={})=>{

    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });
    try {
      const retrieve = await res.json();
      return retrieve;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

  // Updating the UI with the stored data
  const UpdateUI = async(url) =>{
    const res = await fetch(url);
    try {
    // Transform into JSON
    const allData = await res.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML ="Temp: " +Math.round(allData.Temperature)+ ' degrees';
    document.getElementById('content').innerHTML = "Feelings: "+ allData.Contents;
    document.getElementById('date').innerHTML ="Date: " + allData.Date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }