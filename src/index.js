function getWeatherCondition(response){
    console.log(response);
    let temperatureValue = document.querySelector("#temperature-value");
    temperatureValue.innerHTML = Math.round(response.data.temperature.current);
    let windValue = document.querySelector("#wind");
    windValue.innerHTML = response.data.wind.speed;
    let humidityValue = document.querySelector("#humid");
    humidityValue.innerHTML = response.data.temperature.humidity;
    let conditionDescription = document.querySelector("#weather-description");
    conditionDescription.innerHTML = response.data.condition.description;
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    let date = new Date(response.data.time * 1000);
    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    let time = document.querySelector("#time");
    time.innerHTML = formatDate(date);

    getForecast(response.data.city);


}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey = "9tc2ca054b9644af4a7a4ffo0b15b933";
let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(getWeatherCondition);
}

function getForecast(city) {
  let apiKey = "9tc2ca054b9644af4a7a4ffo0b15b933";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
}
function formResults(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    
    searchCity(searchInput.value);

}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[date.getDay()];
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", formResults);

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-tempmax">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-tempmin">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}


searchCity("Cape Town");
