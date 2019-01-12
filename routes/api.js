//Require Dependencies
const express = require("express");
const request = require("request");
const router = express.Router();
const bodyParser = require("body-parser");
const rp = require("request-promise");
EventEmitter = require("events").EventEmitter;

//Set Global Vars.
const transcript_url = "https://shimasu.herokuapp.com/api/get_transcript/k3vFX0YrkMY";
const suggestion_url = "https://shimasu.herokuapp.com/api/get_suggestions/k3vFX0YrkMY";


//Initialize URL Parser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//EventEmitter
const result = new EventEmitter();
request(encodeURI(suggestion_url), (err, response, body) => {
    const stage1 = JSON.parse(body);
    const name_val_array = [];
    for (let x in stage1) {
        name_val_array.push(`${stage1[x].name}`);
    };
    // result.data = name_val_array;
    result.data = name_val_array;
    result.emit("up");
});



const result2 = new EventEmitter();
request(encodeURI(transcript_url), (err, response, body) => {
    const stage2 = JSON.parse(body);
    const text_val_array = [];
    for (let x in stage2) {
        text_val_array.push(`${stage2[x].text}`);
    };
    // result2.data = text_val_array;
    result2.data = text_val_array;
    result2.emit("up2");
});


// result2.on("up2", () => {
//     result.on("up", () => {
//         // console.log(result2.data);
//         // console.log(result.data);
//         console.log(result.data, result2.data);
//     });
// });

//Spliting
function split(a) {
    let arr1 = [];
    for (let i = 0; i <= a.length - 1; i++) {
        arr1.push([a[i]]);
    }
    return arr1;
};


//GET Resquest Handling
router.get("/get_transcript", (req, res) => {
    res.send("transcript")
});

router.get("/get_suggestion", (req, res) => {
    res.send("suggestion");
});

//Export the Module
module.exports = router;




//Callback Demo
// function req(x) {
//     request(encodeURI(x), (err, response, body) => {
//         const name_vale_array = [];
//         for (let x in JSON.parse(body)) {
//             name_vale_array.push(JSON.parse(body)[x].name);
//         };
//         console.log(name_vale_array);
//     });
// };

// function sayHi(x) {
//     console.log(x);
// };
// sayHi(req(suggestion_url));

// Make transcript API Call - Map Function - Slower
// request(encodeURI(transcript_url), (err, response, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//         const stage1 = JSON.parse(body);
//         const start_vals = stage1.map(function (start_val) {
//             return start_val.start
//         });
//         const start_val_array = [];
//         start_val_array.push(start_vals);
//     };
// });

//Make transcript API Call - For In Loop - Faster

// function transcript_api(x) {
//     request(encodeURI(x), (err, response, body) => {
//         if (err) {
//             console.error(err);
//         } else {
//             const stage1 = JSON.parse(body);
//             const text_val_array = [];
//             for (let x in stage1) {
//                 text_val_array.push(`${stage1[x].text}`);
//             };
//         };
//     });
// };


//Make suggestion API Call
// function suggestion_api(x) {
//     request(encodeURI(x), (err, response, body) => {
//         if (err) {
//             return callback(err);
//         } else {
//             const stage2 = JSON.parse(body);
//             const name_val_array = [];
//             for (let x in stage2) {
//                 name_val_array.push(`${stage2[x].name}`);
//             };
//         };
//     });
// };
