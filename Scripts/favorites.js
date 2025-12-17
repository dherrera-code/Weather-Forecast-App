

const inputCity = document.getElementById("inputCity");

// Outputs new DOM elements
const displayFavoriteCity = document.getElementById("displayFavoriteCity");

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

})