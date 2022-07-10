//Current Date and Time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Janurary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();
let year = now.getFullYear();

let minutes = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
let minute1 = minutes[now.getMinutes()];
let minute2 = now.getMinutes();

function getMinute() {
  if (minute2 < 10) {
    return minute1;
  } else {
    return minute2;
  }
}

let minuteFinal = getMinute();

let hours = [
  "12",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
];
let hour = hours[now.getHours()];

function determineAmPm() {
  if (now.getHours() >= 12) {
    return "PM";
  } else {
    return "AM";
  }
}

let amPM = determineAmPm();

let dateTimeNow = `${day} ${month} ${date}, ${year} ${hour}:${minuteFinal} ${amPM}`;

let dateTime = document.querySelector("#current-date-time");
dateTime.innerHTML = `${dateTimeNow}`;
//
//
//
//
//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//
//
//
//wk5 hw
//FIRSTPART
//Inputting "City Value to get temp"

let apiKey = "4968c75d8f2ad2778abebf3da642526a";
let unit = "imperial";

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8b21896e87d6fc275866fc5f0dc04389";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  fahrenheitTemperature = response.data.main.temp;
  let cityName = response.data.name;
  let temperature = Math.round(fahrenheitTemperature);
  let description = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let icon = response.data.weather[0].icon;

  let currentCity = document.querySelector("#current-location");
  currentCity.innerHTML = cityName;

  let currentTemperature = document.querySelector("#current-loc-temp");
  currentTemperature.innerHTML = `${temperature}`;

  let currentWindSpeed = document.querySelector("#current-wind");
  currentWindSpeed.innerHTML = `Windspeed: ${windSpeed} km/h`;

  let currentFeels = document.querySelector("#current-feels");
  currentFeels.innerHTML = `Feels like: ${feelsLike}°F`;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;

  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img//wn/${icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showLatLon(response) {
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#update-city-input");
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(showLatLon);
}

let goButton = document.querySelector("#update-city");
goButton.addEventListener("submit", search);

//hw part II get local coordinates and get temp
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let tButton = document.querySelector("#current-loc-temp-button");
tButton.addEventListener("click", searchLocal);

city = "new york";

//°C link
let fahrenheitTemperature = null;

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-loc-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//°F link
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-loc-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//5 dau forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
                  <div class="col">
                    <div class="weekday">${formatDay(forecastDay.dt)}</div>
                    <div class="date">4/29</div>
                    <div class="dateIcon">

                      <img src="http://openweathermap.org/img//wn/${
                        forecastDay.weather[0].icon
                      }@2x.png" alt "" width= "100">
                    </div>
                     <div class="description">${
                       forecastDay.weather[0].description
                     }</div>
                    <div class="temp">68°F</div>
                    <div class="max">hi: ${Math.round(
                      forecastDay.temp.max
                    )}°F</div>
                    <div class="min">lo: ${Math.round(
                      forecastDay.temp.max
                    )}°F</div>
                  </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
