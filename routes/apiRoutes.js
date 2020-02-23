var express = require("express");
var mongojs = require("mongojs");
module.exports = function(app) {
  // Load index page
  //   app.get("/api/index", function(req, res) {
  //     res.json({});
  //   });

  // Database configuration
  var databaseUrl = "mongoscraper";
  var collections = ["mongoscrapedData"];

  // Hook mongojs configuration to the db variable
  var db = mongojs(databaseUrl, collections);
  db.on("error", function(error) {
    console.log("Database Error:", error);
  });

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

  //   app.get("/api/saved", function(req, res) {
  //     res.json("saved");
  //   });
};
