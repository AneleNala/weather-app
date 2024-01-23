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


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", formResults);

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-tempmax">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-tempmin">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}


searchCity("Paris");
