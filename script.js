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

    async function fetchWeatherData(weatherApi) {
      await fetch(weatherApi)
        .then((response) => {
          console.log("response from weather api", response);
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
          console.log("data", geoLocationData.data);
          const latitude = Math.floor(geoLocationData.data[0].latitude);
          const longitude = Math.abs(
            Math.floor(geoLocationData.data[0].longitude)
          );
          // console.log(longitude);
          // example weather api https://api.weather.gov/points/{latitude},{longitude}
          let weatherApi = `https://api.weather.gov/gridpoints/TOP/${latitude},${longitude}/forecast`;
          let weather = `https://api.weather.gov/gridpoints/TOP/31,80/forecast`;
          console.log("api", weatherApi);
          fetchWeatherData(weatherApi);
          // const location = data.name;
          // document.getElementById(
          //   "weather"
          // ).innerHTML = `<p>Temperature in ${location}: ${temperature}°C</p>
          //           <p>Weather: ${description}</p>`;
        })
        .catch((error) => {
          console.error("Error with API call:", error.message);
        });
      //   //const url = "https://open-weather13.p.rapidapi.com/city/Seattle";
      //   const options = {
      //     method: "GET",
      //     headers: {
      //       "X-RapidAPI-Key":
      //         "2c79d0fa99msh394edc34b67c182p1101b1jsne10c34695d05",
      //       "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      //     },
      //   };

      //   try {
      //     const response = await fetch(url, options);
      //     // console.log("response", response);
      //     console.log("response with text field", response.text());
      //     // result = await response.text();

      //     // console.log("json version of result", JSON.parse(response));
      //     // document.getElementById("weather").innerHTML = `${
      //     //   JSON.parse(result).name
      //     // }:
      //     // ${JSON.parse(result).weather[0].main}`;
      //   } catch (error) {
      //     console.error(error.message);
      //   }
    }

    fetchGeoData();
  });
});
