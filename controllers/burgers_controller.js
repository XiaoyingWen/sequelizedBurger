var express = require("express");

var router = express.Router();

// Requiring our models
var db = require("../models");
var Sequelize = require('sequelize');
// Create all our routes and set up logic within those routes where required.

//load all the burgers upon GET request
router.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(dbBurger) {
        var hbsObject = {
            burgers: dbBurger
        };
        // console.log(hbsObject);
        
        res.render("index", hbsObject);
    });
});

//add one burger upon POST request
router.post("/", function(req, res) {
    //handle the validation error for the burger name db field
    db.Burger.create(req.body).catch(Sequelize.ValidationError, function (err) {
        console.log ("Failed to save the entry.");
        console.log ("System ERR: " + err);
    }).then(function(dbBurger) {
        res.redirect("/");
    });
});

//update the burger upon PUT request with an id
router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    // console.log("condition", condition);

    db.Burger.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(function(dbBurger) {
            res.redirect("/");
        });
});

// Export routes for server.js to use.
module.exports = router;