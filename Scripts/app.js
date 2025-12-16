import { API_KEY } from "./environment.js";
// Declare JS DOM variables
//inputs
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


const getData = async (currentCity) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${API_KEY}`);
    const data = await response.json();
    currentCityData = data;
    console.log(data);
    console.log(data.list);
    //call nececssary functions to display newly selected city
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
            return "/WeatherAssets/moon.png";
        case "02d":
            return "./WeatherAssets/h-cloud.png";
        case "02n":
            return "./WeatherAssets/";//find icon for moon behind cloud
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
            return "./WeatherAssets/rain.png";
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
const convertDateToDayOfWeek = (dateString) => {
    let date = dateString.substring(0, 10);
   
    let savedDate = new Date(date);
savedDate = savedDate.toLocaleDateString('en-US', {year: 'numeric',month: 'short',day: 'numeric'})
    let dayOfWeek = new Date(savedDate).getDay();  //returns 0-6 (1)
    date.toLocaleString();
    switch (dayOfWeek) {
        case 0:
            return "Sunday " + savedDate;
        case 1:
            return "Monday " + savedDate;
        case 2:
            return "Tuesday " + savedDate;
        case 3:
            return "Wednesday " + savedDate;
        case 4:
            return "Thursday " + savedDate;
        case 5:
            return "Friday " + savedDate;
        case 6:
            return "Saturday " + savedDate;
        default:
            return "Non-dayOfWeek!";
    }

}
const displayCurrentCity = (currentCityData) => {
    currentCityName.textContent = currentCityData.city.name + ` ${currentCityData.city.country}`;
    currentCityTemp.textContent = convertKToF(currentCityData.list[0].main.temp) + "°";
    console.log(currentCityData.list[0].dt_txt);
    currentDate.textContent = convertDateToDayOfWeek(currentCityData.list[0].dt_txt)
    let weatherIcon = getWeatherIcon(currentCityData.list[0].weather[0].icon);
    currentWeatherIcon.src = weatherIcon;
    currentWeatherDesc.textContent = currentCityData.list[0].weather[0].main;
    currentHighTemp.textContent = "H: " + convertKToF(currentCityData.list[0].main.temp_max) + "°";
    currentLowTemp.textContent = "L: " + convertKToF(currentCityData.list[0].main.temp_min) + "°";
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
