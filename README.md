#Daniel Herrera

Weather Sprint Day 1 (12/15): Initialized Repo, re-created the structure of both weather pages and created ID tags for all necessary HTML Elements within HOME Page.
Implemented a function to call API data from OpenWEather API!


Monday goals: complete structure and API calls into console. (complete)
Tuesday goals: The goal is to be around 25-45% done with your layout.
wednesday: completed geolocation functionality when index first boots and implemented the search city functionality with input validation.
(Finished implementing favorites functionality Both Pages) (local storage getting used)
thursday: fix search engine to get data for cities with two words. (fixed)
        Add Modal into input validation! (Implemented!)
        Adjust font size and add font families.

    Implement a function to execute on Home page when load and use if statement to determine if program received input from another page else, use geo location.

// Implement a way to display favorite cities within favorites page! (DONE)
// Afterwards, implement modal for the alert() error!
Notes from Pallavi: 
    Two pages:
    Search bar has no dropdown
    Home will use geolocation at start!
    Under Icons will have text under 
    Change 7 day forecast to 5 day forecast

    Favorite Page:
    Will store 5 favorite cities.
    Functionality: button on all cards that can remove a favorite city.
    search bar will redirect to home page with user inputted city!

Peer Review 1: (Jesus Salgado) It was a chore to try to get your API to work but a quick hint i ran into when i was trying to get the api to work is just using: import API_KEY from "./environment.js"; on your app.js and favorites.js also i did this in the environment.js const API_KEY = ""; export default API_KEY;
the { API_KEY } throws it off when trying to use it.
Overall the site looks good but it doesn't match the figma especially when it comes to the Font type, a good thing to do is ask what they used and try to find it online and import it to your HTML or CSS
I noticed that when I look up major cities that they weren't found so you may want to look at your app.js and figure out what is going on there
Also the img's that load don't make much sense and seem a bit random, also the temps are not accurate either
ex: Tracy, CA shows that on Tue it should be snowing if ou look at the img and the temp says H:27 degrees with a l:16 degrees

I couldn't get the search function to work well enough to fill up the Favorites page but i see that you can remove and add to it so good job there

