"use strict";

// jsHint esversion:6
var express = require("express");

var bodyParser = require("body-parser");

var request = require("request");

var https = require("https");

var options = require("request");

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  var jsonData = JSON.stringify(data);
  var url = "https://us14.api.mailchimp.com/3.0/lists/47ef578679";
  var options = {
    method: "POST",
    auth: "Tharn1:b603350f208b3f2cdc0d331cfb869c96-us14"
  };
  var request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
}); // API KEYS
// b603350f208b3f2cdc0d331cfb869c96-us14
// List ID
// 47ef578679