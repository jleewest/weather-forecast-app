function formatDate() {
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
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${hour}:${minute}`;
}
formatDate();

function showLocationTemperature(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#dest").innerHTML = response.data.weather[0].main;
  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind-speed").innerHTML = `${windSpeed}mph`;
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCity(city) {
  let apiKey = "d2c69b988ab715940fcd9349d5e8f8ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocationTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function temperatureCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#current-temp");
  celsius.innerHTML = Math.round(((celsius.innerHTML - 32) * 5) / 9);
}
let changeToCelsius = document.querySelector("#celsius");
changeToCelsius.addEventListener("click", temperatureCelsius);

function temperatureFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temp");
  fahrenheit.innerHTML = Math.round((fahrenheit.innerHTML * 9) / 5 + 32);
}
let changeToFahrenheit = document.querySelector("#fahrenheit");
changeToFahrenheit.addEventListener("click", temperatureFahrenheit);

function showCurrentTemperature(response) {
  let location = document.querySelector("#location");
  location.innerHTML = `It is currently`;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
}
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d2c69b988ab715940fcd9349d5e8f8ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(getPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

searchCity("San Francisco");
