let lat;
let long;

let inputField = document.querySelector('#inputField')
let infoTxt = document.querySelector('.info-txt')
let inputPart = document.querySelector('#inputPart')
let temperature = document.querySelector('#temperature')
let weatherPart = document.querySelector('.weather-part')
let wImg = document.querySelector('.wImg')
let country = document.querySelector('.country')
let locationInfo = document.querySelector('#locationInfo')

// Getting location with the button
function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess)
}

function onSuccess(pos) {
    lat = pos.coords.latitude;
    long = pos.coords.longitude;

    requestLocation(lat, long)
}

function requestLocation(lat, long) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=120c19bf80b20c9f7ca92bd422c89a92`
    fetchData(api)
}

// Getting location with the user input field

inputField.addEventListener("keyup", e => {
    if (e.key === "Enter" && inputField !== "") {
        requestCity(inputField.value)
    }
})

function requestCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=120c19bf80b20c9f7ca92bd422c89a92`
    fetchData(api)
}

// Fetching data

function fetchData(api) {
    fetch(api).then(res => res.json()).then(result => resultFunction(result))
}

// Set temperature

function resultFunction(info) {

    if (info.cod == '404') {

        infoTxt.classList.add("error")
        infoTxt.innerText = `${inputField.value} isn't a valid city name`

    } else {

        weatherPart.style.display = "block"
        inputPart.style.display = "none";
        console.log(info)

        // Weather
            const city = info.name;
            const country = info.sys.country;
            const { description, id } = info.weather[0];
            const { temp, feels_like, humidity } = info.main

            if (id == 800) {
                wImg.src = "./assets/clear.png"
            } else if (id >= 200 && id <= 232) {
                wImg.src = "./assets/storm.png"
            } else if (id >= 600 && id <= 781) {
                wImg.src = "./assets/snow.png"
            } else if (id > 700 && id < 782) {
                wImg.src = "./assets/haze.png"
            } else if (id > 800 && id < 805) {
                wImg.src = "./assets/clouds.png"
            } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
                wImg.src = "./assets/rain.png"
            }

        // Temperature
            infoTxt.classList.remove("pending", "error")
            temperature.innerText = Math.floor(info.main.temp) + "°C"

        // Info
            locationInfo.innerHTML = info.name + ', ' + info.sys.country
    }
}