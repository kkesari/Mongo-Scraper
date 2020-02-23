var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../config/db");
module.exports = function(app) {
  // Scrape data from one site and place it into the mongodb db
  app.get("/scrape", function(req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://news.ycombinator.com/").then(function(response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      // For each element with a "title" class
      $(".title").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element)
          .children("a")
          .text();
        var link = $(element)
          .children("a")
          .attr("href");

        // If this found element had both a title and a link
        if (title && link) {
          // Insert the data in the scrapedData db
          db.mongoscrapedData.insert(
            {
              title: title,
              link: link
            },
            function(err, inserted) {
              if (err) {
                // Log the error if one is encountered during the query
                console.log(err);
              } else {
                // Otherwise, log the inserted data
                console.log(inserted);
              }
            }
          );
        }
      });
    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });
};
