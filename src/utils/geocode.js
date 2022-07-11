const request = require("request");

const geocode = (address, callback) => {
  const geocodeURL = `http://api.positionstack.com/v1/forward?access_key=434cf30f78638cf86a5c02889b5d684d&query=${encodeURIComponent(
    address
  )}`;
  if (address.length < 3)
    callback("Location must have at least 3 charachters.", undefined);
  else {
    request({ url: geocodeURL, json: true }, (error, response) => {
      if (error)
        callback(
          "Unable to connect to the server. Check your Internet connection.",
          undefined
        );
      else if (response.body.data.length === 0)
        callback("Unable to find location.", undefined);
      else
        callback(undefined, {
          location: response.body.data[0].name,
          latitude: response.body.data[0].latitude,
          longitude: response.body.data[0].longitude,
        });
    });
  }
};

module.exports = geocode;
