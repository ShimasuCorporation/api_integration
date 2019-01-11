// Require Dependencies
const express = require("express");
const path = require("path");

//Define Global Vars.
const port = 3000;

//Initialize the App
app = express();


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