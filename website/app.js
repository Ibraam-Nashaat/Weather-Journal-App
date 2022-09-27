/* Global Variables */
const baseURL="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=e3aec68fd901b006998cdf08ebefcbc9&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.querySelector('button').addEventListener('click', performAction);

function performAction(e){
const zipCode =  document.getElementById('zip').value;
getWeatherStats(baseURL,zipCode, apiKey).then(function(WeatherData)
{
const UserRes= document.getElementById('feelings').value;
postData('/',{Temperature:WeatherData.main.temp,Contents:UserRes,Date:newDate}).then(function(data)
{
  document.getElementById("date").innerHTML= "Date: "+data[data.length-1].Date;
  document.getElementById("temp").innerHTML= "Temp: "+data[data.length-1].Temperature;
  document.getElementById("content").innerHTML= "Content: "+data[data.length-1].Contents;
})
});

}
const getWeatherStats = async (baseURL, zipCode, key)=>{

  const res = await fetch(baseURL+zipCode+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
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