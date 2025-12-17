import { API_KEY } from "./environment.js";
// Declare JS DOM variables
// input
const inputCity = document.getElementById("inputCity");

const currentCityName = document.getElementById("currentCityName");
const currentCityTemp = document.getElementById("currentCityTemp");
const currentDate = document.getElementById("currentDate");
const toggleFavoriteBtn = document.getElementById("toggleFavoriteBtn");
// elements from current day city temps and stats
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
const currentWeatherDesc = document.getElementById("currentWeatherDesc");
const currentHighTemp = document.getElementById("currentHighTemp");
const currentLowTemp = document.getElementById("currentLowTemp");
// 5 Day forecast of currently selected city (15 elements)
const firstDayOfWeek = document.getElementById("firstDayOfWeek");
const secondDayOfWeek = document.getElementById("secondDayOfWeek");
const thirdDayOfWeek = document.getElementById("thirdDayOfWeek");
const fourthDayOfWeek = document.getElementById("fourthDayOfWeek");
const fifthDayOfWeek = document.getElementById("fifthDayOfWeek");

const firstIconWeather = document.getElementById("firstIconWeather");
const secondIconWeather = document.getElementById("secondIconWeather");
const thirdIconWeather = document.getElementById("thirdIconWeather");
const fourthIconWeather = document.getElementById("fourthIconWeather");
const fifthIconWeather = document.getElementById("fifthIconWeather");

const firstHighNLowTemps = document.getElementById("firstHighNLowTemps");
const secondHighNLowTemps = document.getElementById("secondHighNLowTemps");
const thirdHighNLowTemps = document.getElementById("thirdHighNLowTemps");
const fourthHighNLowTemps = document.getElementById("fourthHighNLowTemps");
const fifthHighNLowTemps = document.getElementById("fifthHighNLowTemps");

// Outputs new DOM elements
const displayFavoriteCity = document.getElementById("displayFavoriteCity");

let favoriteBool = false;
// let currentCity = "Stockton"
let currentCityData;


const getCityData = async (currentCity) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${API_KEY}`);
    const data = await response.json();
    currentCityData = data;
    console.log(data);
    console.log(data.message);
    if(data.message === "city not found")
    {
        alert("Please Enter a valid city name!");
    }
    else
    {
        displayCurrentCity(currentCityData);

    }
}

const getGeoLocationData = async (lat, long) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`);
    const data = await response.json();
    currentCityData = data;
    console.log(data);
    console.log(currentCityData.city.name);
    console.log(currentCityData.list[0].main.temp);
    displayCurrentCity(currentCityData);
}
const convertKToF = (Kelvin) => {
    return Math.floor(((Kelvin - 273.15) * 9 / 5) + 32);
}
const getWeatherIcon = (iconID) => {
    switch (iconID) {
        case "01d":
            return "./WeatherAssets/yellow-sun.png";
        case "01n":
            return "/WeatherAssets/crescentMoon.png";
        case "02d":
            return "./WeatherAssets/h-cloud.png";
        case "02n":
            return "./WeatherAssets/moonAndCloud.png";//find icon for moon behind cloud
        case "03d":
            return "./WeatherAssets/clouds.png";
        case "03n":
            return "./WeatherAssets/clouds.png";
        case "04d":
            return "./WeatherAssets/cloudy.png";
        case "04n":
            return "./WeatherAssets/cloudy.png";
        case "09d":
            return "./WeatherAssets/rain.png";
        case "09n":
            return "./WeatherAssets/rain.png";
        case "10d":
            return "./WeatherAssets/sunAndRainy.png";
        case "10n":
            return "./WeatherAssets/rain.png";
        case "11d":
            return "./WeatherAssets/thunderstorm-1265161_1280.png";
        case "11n":
            return "./WeatherAssets/thunderstorm-1265161_1280.png";
        case "13d":
            return "./WeatherAssets/snow.png";
        case "13n":
            return "./WeatherAssets/snow.png";
        case "50d":
            return "./WeatherAssets/foggy.png";
        case "50n":
            return "./WeatherAssets/foggy.png";
        default:
            break;
    }
}
const getCurrentDate = (dateString) => {

    let savedDate = new Date(dateString);
    savedDate = savedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    let dayOfWeek = new Date(savedDate).getDay();  //returns 0-6 (1)
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return dayArray[dayOfWeek] + ` ${savedDate}`;
}
const getDayOfWeek = (dateString) => {
    let newDate = new Date(dateString).getDay();
    console.log(newDate + " " + new Date(dateString))
    const dayArray = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    return dayArray[newDate];
}
const getHighNLow = (data, startIndex) => {
    let highTemp = data.list[startIndex].main.temp_max;
    let lowTemp = data.list[startIndex].main.temp_min ;
    for(let i = startIndex + 1; i < startIndex+7; i++)
    {
        if(lowTemp > data.list[i].main.temp_min) lowTemp = data.list[i].main.temp_min;

        if(highTemp < data.list[i].main.temp_max) highTemp = data.list[i].main.temp_max;
    }
    return `H: ${convertKToF(highTemp)}° L: ${convertKToF(lowTemp)}°`

}
const displayCurrentCity = (currentCityData) => {
    currentCityName.textContent = currentCityData.city.name + ` ${currentCityData.city.country}`;
    currentCityTemp.textContent = convertKToF(currentCityData.list[0].main.temp) + "°";
    console.log(currentCityData.list[0].dt_txt);
    currentDate.textContent = getCurrentDate(currentCityData.list[0].dt_txt)
    currentWeatherIcon.src = getWeatherIcon(currentCityData.list[0].weather[0].icon);
    currentWeatherDesc.textContent = currentCityData.list[0].weather[0].main;
    currentHighTemp.textContent = "H: " + convertKToF(currentCityData.list[0].main.temp_max) + "°";
    currentLowTemp.textContent = "L: " + convertKToF(currentCityData.list[0].main.temp_min) + "°";

    //Add a way to grab forecast data for next 5 days
    console.log(currentCityData.list[7].dt_txt)
    firstDayOfWeek.textContent = getDayOfWeek(currentCityData.list[7].dt_txt);
    firstIconWeather.src = getWeatherIcon(currentCityData.list[7].weather[0].icon);
    firstHighNLowTemps.textContent = getHighNLow(currentCityData, 1);

    secondDayOfWeek.textContent = getDayOfWeek(currentCityData.list[15].dt_txt)
    secondIconWeather.src = getWeatherIcon(currentCityData.list[15].weather[0].icon);
    secondHighNLowTemps.textContent = getHighNLow(currentCityData, 9);

    thirdDayOfWeek.textContent = getDayOfWeek(currentCityData.list[23].dt_txt)
    thirdIconWeather.src = getWeatherIcon(currentCityData.list[23].weather[0].icon);
    thirdHighNLowTemps.textContent = getHighNLow(currentCityData, 17);

    fourthDayOfWeek.textContent = getDayOfWeek(currentCityData.list[31].dt_txt)
    fourthIconWeather.src = getWeatherIcon(currentCityData.list[31].weather[0].icon);
    fourthHighNLowTemps.textContent  = getHighNLow(currentCityData, 25);

    fifthDayOfWeek.textContent = getDayOfWeek(currentCityData.list[39].dt_txt)
    fifthIconWeather.src = getWeatherIcon(currentCityData.list[39].weather[0].icon);
    fifthHighNLowTemps.textContent = getHighNLow(currentCityData, 33);
}
const geoLocation = () => {
    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            getGeoLocationData(latitude, longitude);
        },

    );
};
toggleFavoriteBtn.addEventListener("click", () => {
    console.log("Button is pressed!");
    if (!favoriteBool) {
        toggleFavoriteBtn.src = "./WeatherAssets/heart-red.png"
        favoriteBool = !favoriteBool;
    }
    else {
        toggleFavoriteBtn.src = "./WeatherAssets/heart-outline.png"
        favoriteBool = !favoriteBool;
    }
})
//This function should run when the websites first boots.
geoLocation();

inputCity.addEventListener("keypress", (event) => {
    console.log(event);
    if(event.key === "Enter"){

        console.log("you have pressed Enter!");
        // If user entered state code or country code
        // insert a function that will call the API and display input city,
        // implement input validation.
        getCityData(inputCity.value);
        inputCity.value = "";
    }
})