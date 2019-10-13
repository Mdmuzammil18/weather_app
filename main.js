// API key from openweathermap.org
var appKey = "82005d27a116c2880c8f0fcb866998a0";

// declaring variables
let tempratureValue;
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let searchLink;
let jsonObject;

// getting an input from user
searchInput.addEventListener("keypress", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}
// API function
findWeatherDetails = () => {
  if (searchInput.value === "") {
  } else {
    searchLink =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchInput.value +
      "&appid=" +
      appKey;
    httpRequestAsync(searchLink, theResponse);
  }
};

// parsing and assigning the objects to elements
theResponse = response => {
  jsonObject = JSON.parse(response);
  cityName.innerHTML = searchInput.value;
  tempratureValue = parseInt(jsonObject.main.temp - 273);
  icon.src =
    "https://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = `${tempratureValue} ${CF}`;
};

// retriving the data object
httpRequestAsync = (url, callback) => {
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200)
      callback(httpRequest.responseText);
  };
  httpRequest.open("GET", url, true); // true for asynchronous
  httpRequest.send();
};

//Reference for Celcius & Ferhanite Letters
let CF = `<sup id="C" onclick="convertTempC()"> &degC |</sup><sup id="F" onclick="convertTempF()">&degF</sup>`;

//To convert C to F and viceversa
convertTempF = () => {
  let C = tempratureValue;
  let Fer = Math.round((C * 9) / 5 + 32);
  document.getElementById("temp").innerHTML = ` ${Fer}  ${CF}`;
};

convertTempC = () => {
  let C = tempratureValue;
  document.getElementById("temp").innerHTML = ` ${C}  ${CF}`;
};
