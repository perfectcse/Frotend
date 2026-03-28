const apiKey = "2c7479b117cc938d7fd6d04430b5236b";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = cityInput.value;
  const error = document.getElementById("error");

  if (city === "") {
    error.innerText = "Please enter a city";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = `🌡 Temperature: ${data.main.temp} °C`;
    document.getElementById("description").innerText = `🌥 Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `🌬 Wind Speed: ${data.wind.speed} km/h`;

    error.innerText = "";

  } catch (err) {
    error.innerText = err.message;
  }
}