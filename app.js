var express = require("express");
var bodyParser = require("body-parser");
var ConnService = require('./ProjFiles/Services/ConnectionService.js');

var conn = ConnService.GetConnection1();
var app = express();

/*
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
*/

var port = process.env.PORT || 3000;
// app.use(express.json());
// app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
*/
var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});

var routes = require("./ProjFiles/Services/routes.js")(app, conn, server);
