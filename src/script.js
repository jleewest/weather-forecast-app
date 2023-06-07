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
  let minute = now.getMinutes();
  let meridiem = "AM";

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  {
    meridiem = "PM";
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Data Received: ${day} at ${hour}:${minute} ${meridiem}`;
}
formatDate();

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatForecastDay(
            forecastDay.time
          )}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt=""
            width="42"
            />
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temperature.minimum
            )}°</span>
          </div>
       </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "1adc8btb0637f4ff3663a3o5a9930eea";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemperature(response) {
  let city = response.data.city;
  let currentTemperature = document.querySelector("#current-temp");
  let location = document.querySelector("#location");
  let description = document.querySelector("#dest");
  let descriptionResponse = response.data.condition.description;
  let windSpeed = Math.round(response.data.wind.speed);
  let selectWind = document.querySelector("#wind-speed");
  let humidity = Math.round(response.data.temperature.humidity);
  let selectHumidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  location.innerHTML = `${city}`;
  description.innerHTML =
    descriptionResponse[0].toUpperCase() + descriptionResponse.substring(1);
  selectWind.innerHTML = `Wind: ${windSpeed}mph`;
  selectHumidity.innerHTML = `Humidity: ${humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "1adc8btb0637f4ff3663a3o5a9930eea";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1adc8btb0637f4ff3663a3o5a9930eea";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

searchCity("San Francisco");
