// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// app.use(express.routes);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./scripts/scrape")(app);

// Database configuration
var databaseUrl = "mongoscraper";
var collections = ["mongoscrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// // Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.mongoscrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port: " + PORT);
});
