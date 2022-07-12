const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// setup path for express config
const publicFolder = path.join(__dirname, "../public");
const views = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

// setup static directory to serve
app.use(express.static(publicFolder));

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", views);
hbs.registerPartials(partials); //--> nodmon src/app.js -e js,hbs

// setting up route for hbs template
//.render allows us to render on of our views
app.get("", (req, res) => {
  // first argument is the name of the view to render
  // second argument is an object which contains all of the values for view to access
  res.render("index", {
    title: "Weather App",
    name: "DNLV",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "DNLV",
  });
});

app.get("/about", (req, res) => {
  res.render("weather", {
    title: "About",
    name: "DNLV",
  });
  //end point
  // if (!req.query.address)
  //   return res.send({ error: "Address must be provided." });

  // geocode(req.query.address, (error, locationData) => {
  //   if (error) return res.send({ error: error });
  //   forecast(
  //     locationData.location,
  //     locationData.latitude,
  //     locationData.longitude,
  //     (error, forecastData) => {
  //       if (error) return res.send({ error: error });
  //       res.send(forecastData);
  //     }
  //   );
  // });
  // res.render("weather", {
  //   title: "Weather",
  //   name: "DNLV",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must provide a search term" });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("Server is up on " + port);
});

//query string is provided at th eond of url --> ? + key=value & key=value
