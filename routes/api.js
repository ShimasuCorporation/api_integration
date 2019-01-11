//Require Dependencies
const express = require("express");
const request = require("request");
const router = express.Router();
const bodyParser = require("body-parser");

//Set Global Vars.
const transcript_url = "https://shimasu.herokuapp.com/api/get_transcript/k3vFX0YrkMY";
const suggestion_url = "https://shimasu.herokuapp.com/api/get_suggestions/k3vFX0YrkMY";


//Initialize URL Parser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//Make transcript API Call - Map Function
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
//         console.log(start_val_array);
//     };
// });

//Make transcript API Call - For In Loop
request(encodeURI(transcript_url), (err, response, body) => {
    if (err) {
        console.error(err);
    } else {
        const stage1 = JSON.parse(body);
        for (let x in stage1) {
            console.log(`${stage1[x].start}`);
        };
    };
});

//GET Resquest Handling
router.get("/get_transcript", (req, res) => {
    res.send("transcript")
});

router.get("/get_suggestion", (req, res) => {
    res.send("suggestion");
});

//Export the Module
module.exports = router;