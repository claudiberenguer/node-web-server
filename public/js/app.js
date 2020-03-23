
// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?limit=1&language=ca&access_token=pk.eyJ1IjoiY2JlcmVuZ3VlcjIiLCJhIjoiY2s3cDNla3FtMDNhaTNyanlvb2Y1ZHV3cSJ9.Lu_7TtIFyi2iTPNCHB1PjA').then( (response) => {
//     response.json().then( (data) => {
//         if (data.features.length == 0)
//         {
//             document.getElementById("message").innerHTML = '<br>Could not geocode address</br>';
//             return;
//         }
//         const location= data.features[0].place_name;
//         const lon= data.features[0].center[0];
//         const lat= data.features[0].center[1];

// import { response } from "express";

//         fetch('https://api.darksky.net/forecast/f021737fe8329299ff5d568507c3d8ab/' + lat + ',' + lon +'?lang=ca&units=si&mode=no-cors').then( (response) => {
//             response.json().then( (data) => {
//                 if (data.error){
//                     document.getElementById("message").innerHTML = '<br>DarkSky:' + data.error + '</br>';
//                     return;
//                 }
//                 const forecast = data.currently.summary;
//                 document.getElementById("message").innerHTML = '<br>Location:' + location + '</br> \
//                                                                 <br>Forecast:' + forecast + '</br>';
//             });
//         });
//     });
// });

const weatherForm = document.querySelector('form');
const weatherInput  = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    message1.textContent = 'Loading ...';
    message2.textContent = '';
    fetch('/weather?address=' + encodeURIComponent(weatherInput.value)).then( (response) => {
    response.json().then( ({error, forecastData}) => {
        if(error) {
            message1.textContent = error;
            return;
        } 
        message1.textContent = forecastData.location;
        message2.textContent = forecastData.forecast;
    });  
});
});