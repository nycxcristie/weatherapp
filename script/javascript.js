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
//
//
//
//wk5 hw
//FIRSTPART
//Inputting "City Value"

let apiKey = "8b21896e87d6fc275866fc5f0dc04389";
let unit = "imperial";

function showWeather(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;

  let currentCity = document.querySelector("#current-location");
  currentCity.innerHTML = cityName;

  let currentTemperature = document.querySelector("#current-loc-temp");
  currentTemperature.innerHTML = `${temperature}°F`;

  let currentDescription = document.querySelector("#description-icon");
  currentDescription.innerHTML = description;

  let currentWindSpeed = document.querySelector("#current-wind");
  currentWindSpeed.innerHTML = `Wind: ${windSpeed} km/h`;

  let currentFeels = document.querySelector("#current-feels");
  currentFeels.innerHTML = `Feels like: ${feelsLike}°F`;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
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

//PartII Bonus
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocal(event) {
  // event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let tButton = document.querySelector("#current-loc-temp-button");
tButton.addEventListener("click", searchLocal);

//when page loads show weather for current location
searchLocal();
