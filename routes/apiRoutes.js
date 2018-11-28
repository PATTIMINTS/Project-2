var moment = require("moment");
moment().format();

var Item = require("../models/items.js");

var Sequelize = require("sequelize")

// Routes
// =============================================================
module.exports = function(app) {
  // Search for Specific Items then provides JSON
  app.get("/api/:items?", function(req, res) {
    if (req.params.items) {
      // Display the JSON for ONLY that Item.
    
      Item.findOne({
        where: {
          routeName: req.params.items
        }
        
      }).then(function(result) {
        console.log("running");
        return res.json(result);
      });
    } else {
      Item.findAll({
        where: {
          availableUntil: {
            [Sequelize.Op.gte]: moment().format("YYYY-MM-DD")
          }
        }
      }).then(function(result) {
        return res.json(result);
      });
    }
  });

  // If a user sends data to add a new item
  app.post("/api/new", function(req, res) {
    // Take the request...
    var items = req.body;
    console.log('i am the items', items)
    // Create a routeName

    // Using a RegEx Pattern to remove spaces
    
    var routeName = items.item.replace(/\s+/g, "").toLowerCase();

    // Adds the item to the database using sequelize
    Item.create({
      routeName: routeName,
      item: items.item,
      area: items.area,
      description: items.description,
      pickup: items.pickup,
      availableUntil: moment(items.availableUntil).toISOString()
    });

    res.status(204).end();
  });
};
