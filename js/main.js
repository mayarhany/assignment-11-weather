"use strict";


// ^ app variables
const searchInput = document.querySelector('#search');
let forecastParentDiv = document.querySelector('#forecast');
// console.log(searchInput, forecastParentDiv);
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



// & functions
async function search(userLocation){
    let promise = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6ce0824211194e9a8de125910233012&q=${userLocation}&days=3`);
    if(promise.ok === true && promise.status === 200){
        let data = await promise.json();
        let locations = data.location
        // console.log(data.location, data.current, data.forecast.forecastday);
        displayToday(data.current, data.location)
        displayLastTwoDays(data.forecast.forecastday)
    }
    
    
}
search('mansoura')

function displayToday(current, location){
    if(current !== null){
        let date = new Date();

        let today = `
        <div class="col-lg-4 bg-transparent-color today forecast">
                        <div id="today" class="forecast-header pt-2 d-flex justify-content-between align-items-center">
                            <p class="day">${days[date.getDay()]}</p>
                            <p class="date">${date.getDate() + months[date.getMonth()]}</p>
                        </div>
                        <div id="current" class="forecast-content ">
                            <h5 class="location py-3">${location.name}</h5>
                            <div class="degree">
                                <h2 class="num display-1 fw-semibold">${current.temp_c}<sup>o</sup>C</h2>
                            </div>
                            <img src="${current.condition.icon}" width="90" alt="">
                            <p class="custom py-2">${current.condition.text}</p>
                            <div class="spans d-flex gap-3 py-3">
                                <span>
                                    <img src="./images/icon-umberella.png" width="30" alt="">
                                    20%
                                </span>
                                <span>
                                    <img src="./images/icon-wind.png" width="30" alt="">
                                    18km/h
                                </span>
                                <span>
                                    <img src="./images/icon-compass.png" width="30" alt="">
                                    East
                                </span>
                            </div>
                        </div>
                    </div>
        `;
        forecastParentDiv.innerHTML = today;





        
        // console.log(date);
        // console.log(days[date.getDay()]);
        // console.log(date.getDate());
        // console.log(months[date.getMonth()]);
        // console.log(location.name);
        // console.log(current.temp_c);
        // console.log(current.condition.icon);
        // console.log(current.condition.text);
    }
}


function displayLastTwoDays(list){
    let otherTwoDays = '';
    
    // i = 0 ==> today
    for(let i = 1 ; i < list.length ; i++){

        let date = new Date(list[i].date);

        otherTwoDays = `
        <div class="col-lg-4 bg-transparent-color text-center forecast">
                        <div class="forecast-header pt-2">
                            <p class="day">${days[date.getDate()]}</p>
                            
                        </div>
                        <div class="forecast-content">
                            <div class="forecast-icon py-5">
                                <img src="${list[i].day.condition.icon}" width="50" alt="">
                            </div>
                            <div class="degree">
                                <h2 class="num">${list[i].day.maxtemp_c}<sup>o</sup> C</h2>
                            </div>
                            <small>15.2 <sup>o</sup></small>
                            <p class="custom pt-2">${list[i].day.condition.text}</p>
                        </div>
                    </div>
        `;
        forecastParentDiv.innerHTML += otherTwoDays;

        // console.log(days[date.getDate()]);
        // console.log(list[i].day.condition.icon);
        // console.log(list[i].day.maxtemp_c);
        // console.log(list[i].day.condition.text);
    }
}


// * events
searchInput.addEventListener('keyup', function(e){
    search(e.target.value)
    console.log(e.target.value);
})
