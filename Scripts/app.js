
// Declare JS DOM variables




// Outputs
const displayFavoriteCity = document.getElementById("displayFavoriteCity");

let currentCity = "Stockton"
const getData = async (currentCity) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=41f2b9edc30c8f24fe8fcaca12ae33f7`);
    const data = await response.json();
    console.log(data);
}
// getData(currentCity) 
// currentCity = "Buckeye"
// getData(currentCity) 
