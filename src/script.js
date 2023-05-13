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
  let currentTemperature = document.querySelector("#current-temp");
  let location = document.querySelector("#location");
  let description = document.querySelector("#dest");
  let windSpeed = Math.round(response.data.wind.speed);
  let selectWind = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let descriptionResponse = response.data.condition.description;

  celsiusTemperature = response.data.temperature.current;

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  location.innerHTML = response.data.city;
  description.innerHTML =
    descriptionResponse[0].toUpperCase() + descriptionResponse.substring(1);
  selectWind.innerHTML = `${windSpeed}mph`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  // document.querySelector("#high-temp").innerHTML = Math.round(
  //   response.data.main.temp_max
  // );
  // document.querySelector("#low-temp").innerHTML = Math.round(
  //   response.data.main.temp_min
  // );
}

function showCurrentTemperature(response) {
  let city = response.data.city;
  let currentTemperature = document.querySelector("#current-temp");
  let location = document.querySelector("#location");
  let description = document.querySelector("#dest");
  let windSpeed = Math.round(response.data.wind.speed);
  let selectWind = document.querySelector("#wind-speed");
  let humidity = Math.round(response.data.temperature.humidity);
  let selectHumidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  location.innerHTML = `In ${city}, it is currently`;
  description.innerHTML = response.data.condition.description;
  selectWind.innerHTML = `Wind: ${windSpeed}mph`;
  selectHumidity.innerHTML = `Humidity: ${humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function searchCity(city) {
  let apiKey = "1adc8btb0637f4ff3663a3o5a9930eea";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocationTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayTemperatureCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  celsius.innerHTML = Math.round(celsiusTemperature);
}

function displayTemperatureFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  fahrenheit.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1adc8btb0637f4ff3663a3o5a9930eea";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayTemperatureFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayTemperatureCelsius);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

searchCity("San Francisco");
