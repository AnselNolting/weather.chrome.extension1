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
