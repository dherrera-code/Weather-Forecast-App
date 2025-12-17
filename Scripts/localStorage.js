//Create Functions to Save favorites, delete favorites, getFromLocalStorage and update display favorites. 
const saveFavorites = (cityName) => {
    //This function will fire when user toggles on the favorites button
    //Add logic to where at most 6 cities are saved and last city is removed.
    let cityArray = getFromLocalStorage();
    console.log(cityArray.length)

    if (!cityArray.includes(cityName)) {
        if (cityArray.length > 5) {
            cityArray.pop();
        }
        cityArray.unshift(cityName)
    }

    console.log(cityArray);
    localStorage.setItem("favoriteCities", JSON.stringify(cityArray))
}

const getFromLocalStorage = () => {
    let cityNames = localStorage.getItem("favoriteCities"); //This line grabs city names from the key of favoriteCities

    if (cityNames === null) return []

    return JSON.parse(cityNames);
}

const removeFavoriteCity = (city) => {
    let cityArray = getFromLocalStorage()

    let cityIndex = cityArray.indexOf(city);

    cityArray.splice(cityIndex, 1);
    console.log(cityArray)
    localStorage.setItem("favoriteCities", JSON.stringify(cityArray))

}

//create a function that will display favorites within the favorites.html
export {saveFavorites , getFromLocalStorage, removeFavoriteCity}