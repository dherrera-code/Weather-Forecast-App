import { getFromLocalStorage, saveFavorites, removeFavoriteCity } from "./localStorage.js"
import { API_KEY } from "./environment.js";
//create functions: create favoriteCards, deleteFavCards
const inputCity = document.getElementById("inputCity");

// Outputs new DOM elements
const displayFavoriteCity = document.getElementById("displayFavoriteCity");

const getCityData = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    //pass data to a function to display new favorite card
    createFavCity(data)
}

const createFavCity = (cityData) => {
    //create column to be appended to display variable
    //create
    const mainCol = document.createElement("div")
    mainCol.className = "col my-3";
    const cardContainer = document.createElement('div')
    cardContainer.className = " favCardBg container";
    cardContainer.style = "font-size: 40px;";
    const topRow = document.createElement("div")
    topRow.className = "row mb-4"
    const cityTempCol = document.createElement("div");
    cityTempCol.className = "col ms-4 mt-4"
    const cityName = document.createElement("h2");
        cityName.textContent = "Stockton"
    const currentTemp = document.createElement('p');
        currentTemp.textContent = "45°"
    cityTempCol.appendChild(cityName); 
    cityTempCol.appendChild(currentTemp); 
     //verify that elements were appended appropriately]
    const iconDiv = document.createElement("div");
    iconDiv.className = "col d-flex flex-column"

    const deleteBtn = document.createElement("img");
    deleteBtn.className = "x-button"
    deleteBtn.src = "../WeatherAssets/x-button.png";

    const weatherIcon = document.createElement("img");
    weatherIcon.style = "width: 100px;";
    weatherIcon.class = "mx-auto"
    weatherIcon.src = "../WeatherAssets/clouds.png" //Add a function to get current weather based on data.

iconDiv.appendChild(deleteBtn);
iconDiv.appendChild(weatherIcon);

topRow.appendChild(cityTempCol)
topRow.appendChild(iconDiv)

const highNLowDiv = document.createElement("div")
highNLowDiv.className = "d-flex align-items-end justify-content-center";
const hTemp = document.createElement('p')
hTemp.className = "pe-5"
hTemp.textContent = "H: 60°"
const lTemp = document.createElement('p')
lTemp.textContent = "L: 30°"

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
        console.log(inputCity.value);
        if (inputCity.value.includes(" ")) {
            cityName = inputCity.value.split(" ").join(",");
            console.log(cityName);
        }
        else cityName = inputCity.value;
        inputCity.value = "";
        //Call A function to redirect the user back to main page with cityName data displayed within the UI (DOM)
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