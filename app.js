// Require Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

//Define Global Vars.
const port = 3000;

//Initialize the App
app = express();

//Initialize URL Parser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//Load Routes
const api = require("./routes/api");
const home = require("./routes/home");



//Use Routes
app.use("/api", api);
app.use("/", home);

//Start the Server
app.listen(`${port}`, function () {
    console.log(`Server is listening on port ${port}`);
});