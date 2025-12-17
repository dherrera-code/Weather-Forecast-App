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
}

const createFavCity = (cityData) => {
    //create column to be appended to display variable
    //create



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
// displayFavorites();