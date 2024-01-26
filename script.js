let result = undefined;

console.log(result);

// get city
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector("button");

  submitButton.addEventListener("click", (e) => {
    const cityAndState = document.getElementById("cityInput").value;

    const forwardGeoLocation = `http://api.positionstack.com/v1/forward?access_key=b40d16d7587eb816c2b1d46030184b81&query=${cityAndState}`;
    const great = `https://api.weather.gov/alerts/active?area=${cityAndState}`;
    // let weatherApi = `https://api.weather.gov/gridpoints/TOP/31,80/forecast`;
    const weatherImage = new Image(200, 200);
    weatherImage.src =
      "data:image/jpeg;base64,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";
    document.body.appendChild(weatherImage);

    async function fetchForecastData(forecastApi) {
      await fetch(forecastApi)
        .then((response) => {
          console.log("response from forecast api", response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          document.getElementById(
            "temperature"
          ).innerHTML = `Temperature is: ${data.properties.periods[0].temperature} Fahrenheit`;
          document.getElementById(
            "forecast"
          ).innerHTML = `Forecast is: ${data.properties.periods[0].shortForecast}`;
          document.getElementById(
            "wind"
          ).innerHTML = `WindSpeed is: ${data.properties.periods[0].windSpeed}`;
          document.getElementById("weatherImage").innerHtml = weatherImage.src;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function fetchWeatherData(weatherApi) {
      await fetch(weatherApi)
        .then((response) => {
          console.log("response from weather api", response);
          return response.json();
        })
        .then((data) => {
          //calls a third api call with the forecast api returned from first weather call
          fetchForecastData(data.properties.forecast);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function fetchGeoData() {
      //calls geolocation fetch request
      await fetch(forwardGeoLocation)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error(
              `Error fetching forward Geo Location data points: network response returned a ${response.status} status code`
            );
          }
          return response.json();
        })
        //data from geolocation fetch request
        .then((geoLocationData) => {
          //finds the latitude and longitude and converts them into the format needed for weather api call
          //converts values into a string, slices off last decimal value and converts back into number for second api call
          const latitude = Number(
            geoLocationData.data[0].latitude.toString().slice(0, -1)
          );
          const longitude = Number(
            geoLocationData.data[0].longitude.toString().slice(0, -1)
          );
          const weatherGridPointAPI = `https://api.weather.gov/points/${latitude},${longitude}`;
          fetchWeatherData(weatherGridPointAPI);
        })
        .catch((error) => {
          console.error("Error with API call:", error.message);
        });
    }

    fetchGeoData();
  });
});

//console.log(weatherImage);
