const request = require("request");

const forecast = (location, latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2e9577aca25afb9b360234085412d2db&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;
  request({ url: url, json: true }, (error, response) => {
    if (error)
      callback(
        "Unable to connect to the server. Check your Internet connection.",
        undefined
      );
    else if (response.body.error)
      callback("Unable to find location.", undefined);
    else
      callback(undefined, {
        location: location,
        country: response.body.location.country,
        temperature: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
        description: response.body.current.weather_descriptions[0],
      });
  });
};

module.exports = forecast;
