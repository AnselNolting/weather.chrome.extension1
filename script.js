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
    // const weatherImage = new Image(200, 200);
    // weatherImage.src =
    //   "https://png.pngtree.com/element_our/png/20180823/weather-line-filled-icon-png_65000.jpg";
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
          ).innerHTML = `${data.properties.periods[0].temperature} \xB0F`;
          document.getElementById(
            "forecast"
          ).innerHTML = `Forecast: ${data.properties.periods[0].shortForecast}`;
          document.getElementById(
            "wind"
          ).innerHTML = `Wind Speed: ${data.properties.periods[0].windSpeed}`;
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
