
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
let currentCity = "Stockton"
let currentCityData;

const getData = async (currentCity) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=41f2b9edc30c8f24fe8fcaca12ae33f7`);
    const data = await response.json();
    currentCityData = data;
    console.log(data);
    console.log(data.list)
}

const getGeoLocationData = async (lat, long) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=41f2b9edc30c8f24fe8fcaca12ae33f7`);
    const data = await response.json();
    currentCityData = data;
    console.log(data);
    console.log(data.list);

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
        // Error callback
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert().textContent = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert().textContent = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    alert().textContent = "The request to get user location timed out.";
                    break;
                default:
                    alert().textContent = "An unknown error occurred.";
            }
        }
    );
};
//This function should run when the websites first boots.
geoLocation();

toggleFavoriteBtn.addEventListener("click", () => {
    console.log("Button is pressed!");
    if(!favoriteBool) {
        toggleFavoriteBtn.src = "./WeatherAssets/heart-red.png"
        favoriteBool = !favoriteBool;
    }
    else
    {
        toggleFavoriteBtn.src = "./WeatherAssets/heart-outline.png"
        favoriteBool = !favoriteBool;
    }
})