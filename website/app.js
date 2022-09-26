/* Global Variables */
const baseURL="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=e3aec68fd901b006998cdf08ebefcbc9&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const zipCode =  document.getElementById('zip').value;
getWeatherStats(baseURL,zipCode, apiKey).then(function(WeatherData){
const UserRes= document.getElementById('feelings').value;
postData('/',{Temperature:WeatherData.main,Feelings:UserRes,Date:newDate});
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
      
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }