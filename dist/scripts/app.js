import { Catch } from "./catch.js";
import { Utilities } from "./utilities.js";
import { HttpClient } from "./httpClient.js";
import { Weather } from "./weather.js";


let isSearchBefore = false;
const storage = new Catch();
(() => {
  if (!storage.checkAuth()) {
    console.log("Go to login page");
    Utilities.changePage();
  }
})();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}


const searchInput = document.getElementById('search-input');
const searchModal = document.getElementById('search-modal');
const logoutBtn = document.getElementById('logout-btn');
const emptyStateText = document.getElementById('text-empy-state');
const searchAnimation = document.getElementById('location-content');
/* ==================================================================== */
const cityWrapperBox = document.getElementById('city-state-wrapper');
const boxTemp = document.getElementById('city-temp');
const boxCityName = document.getElementById('city-name');
const boxDate = document.getElementById('date');
const boxDescription = document.getElementById('city-description');
/* ======================================================================= */
const infoCardsWrapper = document.getElementById('info-cards-wrapper');
const weatherTemp = document.getElementById('weather-temp');
const weatherWind = document.getElementById('weather-wind');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherClouds = document.getElementById('weather-clouds');
const weatherFeelsLike = document.getElementById('weatherfeelsLike');
const mainwrapper = document.getElementById('mainwrapper');
const stateBG = document.getElementById('state-bg');


let timeID = 0;

const request = new HttpClient(
  "https://api.openweathermap.org/data/2.5/weather",
  "cf9995fbf43452e8ce53e0f5f3ef3cee"
);


searchInput.addEventListener('keyup', e => {

  searchHistory(searchInput.value);

  if (searchInput.value.length != 0) {
    searchAnimation.classList.remove('hidden');
    infoCardsWrapper.classList.add("hidden");
    clearTimeout(timeID);
    timeID = setTimeout(() => {
        getCitysWeather(searchInput.value)
      }, 1000);
  } else {
    searchAnimation.classList.add('hidden');
    
  }

  

})

mainwrapper.addEventListener('mousedown', e => {

  if (!(e.target.closest("#search-wrapper"))) {
     searchModal.classList.add('hidden');
    searchAnimation.classList.add('hidden') 
  }

  
});


searchModal.addEventListener('mouseenter', e => {
  searchModal.classList.remove('hidden');
});

searchInput.addEventListener('focus', e => {
  
  searchHistory()
  
})

logoutBtn.addEventListener('click', () => {
  Utilities.changePage();
  storage.clear();
})


initAnimation();


function getCitysWeather(city) {
  searchAnimation.classList.remove('hidden');
  infoCardsWrapper.classList.add("hidden");
  request.get(city).then(result => {
    const weather = new Weather(result);
    searchAnimation.classList.add('hidden');
    searchModal.classList.add('hidden');
    generateCityBox(weather);
    generateCards(weather);
    console.log(weather.state);
    weatherCurrentState(weather.state)
    storage.addCity(weather.city);
    isSearchBefore = true;
    searchInput.value = '';
    
  }).catch(error => {
  console.log(error);
})
}

function initAnimation() {


  let search = bodymovin.loadAnimation({
    container: document.getElementById("location-content"),

    path: "./assets/animation/search.json",

    renderer: "svg",

    loop: true,

    autoplay: true,

    name: "Demo Animation",
  });
  
  
}

function weatherCurrentState(state) {
  const CurrentState = Utilities.findCurrentStateFromDesc(state)
  const jsonName = CurrentState.animationJson;
  stateBG.src=`./assets/images/${CurrentState.currentImg}`
  document.getElementById("weather-state").innerHTML = '';
  let animation = bodymovin.loadAnimation({
    container: document.getElementById("weather-state"),

    path: `./assets/animation/${jsonName}`,

    renderer: "svg",

    loop: true,

    autoplay: true,

    name: "Demo Animation",
  });

  // animation.reset()
}

function generateCityBox(weather) {
  cityWrapperBox.classList.remove("hidden");
  boxTemp.textContent = parseInt(weather.temp).toFixed();
  boxCityName.textContent = weather.city;
  boxDate.textContent = weather.getdate();
  boxDescription.textContent = weather.description;
  
}

function generateCards(weather) {
  infoCardsWrapper.classList.remove("hidden");
  emptyStateText.classList.add("hidden")
  weatherTemp.textContent = weather.temp;
  weatherWind.textContent = weather.wind;
  weatherHumidity.textContent = weather.humidity;
  weatherClouds.textContent = weather.clouds;
  weatherFeelsLike.textContent = weather.feelsLike;


}

function searchHistory(char='') {
  let cities = storage.getCities(char);
  if (cities.length == 0) {
    searchModal.classList.add('hidden');
    return
  }


  let html = ``;
  cities.reverse().forEach((city, index) => {
    if (index > 5) return;
    html +=`<span class="bg-gray-200 text-slate-600  hover:bg-gray-300 cursor-pointer rounded-sm px-2 flex justify-between items-center -z-10">
    <p onclick="clickCityItem(this)" class="flex-1 h-full" >${city}</p>
    <span class='mt-1 z-40 text-lg  text-slate-500 hover:text-red-500' onclick="removeCityFromHistory(this)" ><i class="bi bi-x"></i></span>
  </span>`
  });
  searchModal.innerHTML = html;
  searchModal.classList.remove('hidden');
  
}


window.removeCityFromHistory = function (e) {
  storage.removeCity(e.previousElementSibling.textContent);
 
  searchHistory();
}
window.clickCityItem = function(e) {
  
  searchInput.value = e.closest('p').textContent;
  searchAnimation.classList.add('hidden');
  getCitysWeather(searchInput.value);
 
}