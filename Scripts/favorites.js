import { getFromLocalStorage, removeFavoriteCity } from "./localStorage.js"
// import {getWeatherIcon, convertKToF} from "./app.js"
import { API_KEY } from "./environment.js";

const inputCity = document.getElementById("inputCity");
// Outputs new DOM elements
const displayFavoriteCity = document.getElementById("displayFavoriteCity");

const getCityData = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`);
    const data = await response.json();
    createFavCity(data)
}
const getWeatherIcon = (iconID) => {
    switch (iconID) {
        case "01d":
            return "../WeatherAssets/yellow-sun.png";
        case "01n":
            return "../WeatherAssets/crescentMoon.png";
        case "02d":
            return "../WeatherAssets/h-cloud.png";
        case "02n":
            return "../WeatherAssets/moonAndCloud.png";
        case "03d":
            return "../WeatherAssets/blue-cloud.png";
        case "03n":
            return "../WeatherAssets/blue-cloud.png";
        case "04d":
            return "../WeatherAssets/dark-clouds.png";
        case "04n":
            return "../WeatherAssets/dark-clouds.png";
        case "09d":
            return "../WeatherAssets/rain.png";
        case "09n":
            return "../WeatherAssets/rain.png";
        case "10d":
            return "../WeatherAssets/sunAndRainy.png";
        case "10n":
            return "../WeatherAssets/rain.png";
        case "11d":
            return "../WeatherAssets/thunderstorm-1265161_1280.png";
        case "11n":
            return "../WeatherAssets/thunderstorm-1265161_1280.png";
        case "13d":
            return "../WeatherAssets/snow.png";
        case "13n":
            return "../WeatherAssets/snow.png";
        case "50d":
            return "../WeatherAssets/foggy.png";
        case "50n":
            return "../WeatherAssets/foggy.png";
        default:
            break;
    }
}
const convertKToF = (Kelvin) => {
    return Math.floor(((Kelvin - 273.15) * 9 / 5) + 32);
}
const createFavCity = (cityData) => {
    //create column to be appended to display variable
    const mainCol = document.createElement("div")
    mainCol.className = "col my-3";
    const cardContainer = document.createElement('div')
    cardContainer.className = " favCardBg container";
    cardContainer.style = "font-size: 40px;";
    const topRow = document.createElement("div")
    topRow.className = "row mb-4"

    const cityTempCol = document.createElement("div");
    cityTempCol.className = "col ms-4 mt-4 font-imprima"
    const cityName = document.createElement("h2");
    cityName.textContent = cityData.city.name + ", " + cityData.city.country;
    const currentTemp = document.createElement('p');
    currentTemp.textContent = convertKToF(cityData.list[0].main.temp) + '°';
    cityTempCol.appendChild(cityName);
    cityTempCol.appendChild(currentTemp);
    
    const iconDiv = document.createElement("div");
    iconDiv.className = "col d-flex flex-column"

    const deleteBtn = document.createElement("img");
    deleteBtn.className = "x-button"
    deleteBtn.src = "../WeatherAssets/x-button.png";
    deleteBtn.addEventListener("click", () => {
        console.log(cityData.city.name + "," + cityData.city.country)
        removeFavoriteCity(cityData.city.name + "," + cityData.city.country)
        mainCol.remove();
    })

    const weatherIcon = document.createElement("img");
    weatherIcon.style = "width: 100px;";
    weatherIcon.className = "ms-auto me-4"
    weatherIcon.src = getWeatherIcon(cityData.list[0].weather[0].icon) //Add a function to get current weather based on data.

    iconDiv.appendChild(deleteBtn);
    iconDiv.appendChild(weatherIcon);
    topRow.appendChild(cityTempCol)
    topRow.appendChild(iconDiv)

    const highNLowDiv = document.createElement("div")
    highNLowDiv.className = "d-flex align-items-end justify-content-center font-inter";
    highNLowDiv.style = "font-size: 32px"
    const hTemp = document.createElement('p')
    hTemp.className = "pe-5"
    const lTemp = document.createElement('p')

    let lowTemp = cityData.list[0].main.temp_min;
    let highTemp = cityData.list[0].main.temp_max;
    for (let i = 0; i < 4; i++) {
        if (lowTemp > cityData.list[i].main.temp_min) lowTemp = cityData.list[i].main.temp_min
        if (highTemp < cityData.list[i].main.temp_max) highTemp = cityData.list[i].main.temp_max
    }

    hTemp.textContent = `H: ${convertKToF(highTemp)}°`
    lTemp.textContent = `L: ${convertKToF(lowTemp)}°`

    highNLowDiv.appendChild(hTemp);
    highNLowDiv.appendChild(lTemp);
    cardContainer.appendChild(topRow);

    cardContainer.appendChild(highNLowDiv);
    mainCol.appendChild(cardContainer);
    displayFavoriteCity.appendChild(mainCol);
}

inputCity.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        let cityName;
        console.log("you have pressed Enter!");
        // If user entered state code or country code
        // implement input validation.
        if (inputCity.value.includes(",")) {
            cityName = inputCity.value.split(",");
            let index = 0;
            cityName.forEach(i => {
                cityName[index] = i.trim();
                index++;
            });
        }
        else {
            cityName = inputCity.value.trim();
        }
        console.log(cityName.toString())
        inputCity.value = "";
        sessionStorage.setItem("searchCity", cityName.toString())
        window.location.href = "../index.html";
    }
});
const displayFavorites = () => {
    let cityArray = getFromLocalStorage();
    console.log(cityArray);
    for (let i = 0; i < cityArray.length; i++) {
        // Call a function to getData from API then create elements to display fav cards!
        getCityData(cityArray[i])
    }
}
displayFavorites();