//Require Dependencies
const express = require("express");
const router = express.Router();

//Set Global Vars.
const transcript_url = "https://shimasu.herokuapp.com/api/get_transcript/k3vFX0YrkMY";
const suggestion_url = "https://shimasu.herokuapp.com/api/get_suggestions/k3vFX0YrkMY";

//GET Resquest Handling
router.get("/get_transcript", (req, res) => {
    res.send("transcript")
});

router.get("/get_suggestion", (req, res) => {
    res.send("suggestion");
});

//Export the Module
module.exports = router;