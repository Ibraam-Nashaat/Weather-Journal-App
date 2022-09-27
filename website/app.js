/* Global Variables */
const baseURL="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=e3aec68fd901b006998cdf08ebefcbc9&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.querySelector('button').addEventListener('click', performAction);

function performAction(e){
const zipCode =  document.getElementById('zip').value;
retrieveData('/data').then(function(projectData){
getWeatherStats(baseURL,zipCode, apiKey).then(function(temp)
{
projectData.Temperature= temp;
projectData.Contents= document.getElementById('feelings').value;
projectData.Date= newDate;
postData('/',projectData).then(UpdateUI('/data'))
});

})};


const getWeatherStats = async (baseURL, zipCode, key)=>{

  const res = await fetch(baseURL+zipCode+key)
  try {

    const data = await res.json();
    console.log(data)
    return data.main.temp;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

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