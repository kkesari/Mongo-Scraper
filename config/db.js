var express = require("express");
var mongojs = require("mongojs");

// Database configuration
var databaseUrl = "mongoscraper";
var collections = ["mongoscrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Export the db
module.exports = db;
