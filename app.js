var express = require("express");
var path = require("path");
var bodyPasser = require("body-parser");
var csv = require("ya-csv");

var app = express();
app.use(express.static(path.join(__dirname, "")));
app.use(bodyPasser.urlencoded({extended:true}));

app.get("/hello", function(request, respond)  {
    respond.sendFile(path.join(__dirname, "index.html"));
});

app.post("/booking", function(request, respond) {
    respond.send("name: " + request.body.fullname);
    var fullName = request.body.fullname;

    var database = csv.createCsvFileWriter("bookings.csv", {"flags": "a"});
    database.writeRecord([fullName]);
    database.writeStream.end();
});
var server = app.listen(8080, function () {} );