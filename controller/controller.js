const express = require("express");
const router = express.Router();
const zomato = require("../models/zomato");
const bcrypt = require("bcrypt")

var order = require("../models/models.js");

//GET Route to display main page
router.get("/", function (req, res) {
  res.render("index");
});

//GET Route to display login page
router.get("/login", function (req, res) {
  res.render("login");
});

//GET Route to display registration page
router.get("/register", function (req, res) {
  res.render("register");
});

//GET Route to display restaurant list for location
router.get("/restaurants/:location", async function (req, res) {
  try {
    const inputLocation = req.params.location;
    const listR = await zomato.retrieveRestaurants(inputLocation);
    const db = {
      list: listR,
    };
    // console.log(db)
    res.render("restaurantList", db);
  } catch (err) {
    console.log(err);
  }
});

//GET Route to display restaurant page
router.get("/:restaurantID", async function (req, res) {
  try {
    const resID = req.params.restaurantID;
    const listR = await zomato.restaurantInformation(resID);

    order.selectAll(function (data) {
      const restaurantInfo = {
        restaurant: listR,
        item: data,
      };
      res.render("restaurant", restaurantInfo);
    });
  } catch (err) {
    console.log(err);
  }
});

//GET Route to display order details page
router.get("/order/:id", async function (req, res) {
  res.render("confirmOrder");
});

router.post("/api/order", async function (req, res) {
  try {
    const password = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(1), null);
    order.insertOne(
      [
        "username",
        "password",
        "firstname",
        "lastname",
        "usertype",
        "customerId",
      ],
      [
        req.body.username,
        password,
        req.body.firstname,
        req.body.lastname,
        "registered",
        4,
      ],

      await function (result) {
        console.log("Data is inserted....");
        res.json({ id: result.insertId });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/login", async function (req, res) {
  const username = req.body.username
  const password = req.body.password
  function compareUsers(users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == username && users[i].password == password) {
        console.log(username)
        res.redirect("/")
        break
      }
      else (console.log("no user account"))
    }
  }
  order.selectAllUsers(function (data) {
    const users = data
    compareUsers(users)

  })
  res.json(users)
})

//Export routes
module.exports = router;
