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
app.listen(`${port}`, () => {
    console.log(`Server is listening on port ${port}`);
});


// const arr3 = [];
// for (let index = 0; index < arr1.length; index++) {
//     for (let index2 = 0; index2 < arr2.length; index2++) {
//         if (arr1[index] == arr2[index2]) {
//             arr3.push(arr1[index]);
//         };
//     };
// };

// console.log(arr3);