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
request(encodeURI(transcript_url), (err, response, body) => {
    if (err) {
        console.error(err);
    } else {
        const stage1 = JSON.parse(body);
        const start_val_array = [];
        for (let x in stage1) {
            start_val_array.push(`${stage1[x].text}`);
        };
        //Make suggestion API Call
        request(encodeURI(suggestion_url), (err, response, body) => {
            if (err) {
                console.error(err);
            } else {
                const stage2 = JSON.parse(body);
                const name_val_array = [];
                for (let x in stage2) {
                    name_val_array.push(`${stage2[x].name}`);
                };
                //Operation Take Place Here
                const r1 = new Set(name_val_array);
                const r2 = new Set(start_val_array);
            }
        });

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