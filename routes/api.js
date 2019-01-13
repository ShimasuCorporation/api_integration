//Require Dependencies
const express = require("express");
const request = require("request");
const router = express.Router();
const bodyParser = require("body-parser");
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

////EventEmitter

//API Call -> Suggestion
const result = new EventEmitter();
request(encodeURI(suggestion_url), (err, response, body) => {
    const stage1 = JSON.parse(body);
    const name_val_array = [];
    for (let x in stage1) {
        name_val_array.push(`${stage1[x].name}`);
    };
    result.data = name_val_array;
    result.emit("up");
});

//API Call -> Transcript
const result2 = new EventEmitter();
request(encodeURI(transcript_url), (err, response, body) => {
    const stage2 = JSON.parse(body);
    const text_val_array = [];
    for (let x in stage2) {
        text_val_array.push(`${stage2[x].text}`);
    };
    result2.data = text_val_array;
    result2.emit("up2");
});

//API Call -> Time
const result3 = new EventEmitter();
request(encodeURI(transcript_url), (err, response, body) => {
    const stage3 = JSON.parse(body);
    const time_val_array = [];
    for (let x in stage3) {
        time_val_array.push(`${stage3[x].start}`);
    };
    result3.data = time_val_array;
    result3.emit("up3");
});


//Spliting Function
function spliter(a) {
    const arr1 = [];
    let arr2;
    for (let i = 0; i <= a.length - 1; i++) {
        arr1.push(JSON.stringify(a).replace(/[[\]\\\".,”“]/g, ""));
        arr2 = (arr1[0].split(" "));
    };
    return arr2
};

//Time Output
result3.on("up3", () => {
    // console.log(result3.data.length);
});

//Cleaning Func
function cf(x) {};

//Final Matching
result2.on("up2", () => { //Call the Transcript EventEmitter
    result.on("up", () => { //Call the Suggestion EventEmitter
        let splited = []; //Initialize the Array for Splited Transcript
        splited = spliter(result2.data); //Passd the Splited Data into the Array
        // console.log(result2.data.length); //Programming Trace
        let arry_final_1 = []; //Initialize the Array for the Final Matching-Short
        let arry_final_2 = []; //Initialize the Array for the Final Matching-Long
        for (let index = 0; index < splited.length; index++) { //Iterate Through the Longer Array - Transcript
            for (let index2 = 0; index2 < result.data.length; index2++) { //Iterate Through the Shorter Array - Suggestion
                if (splited[index] == result.data[index2]) { //Find the Matching Value 
                    arry_final_1.push(result.data[index2]); //Push the Matching Value into the Final Array
                    arry_final_2.push(splited[index]); //Push the Matching Value into the Final Array
                };
            };
        };
        console.log(arry_final_1);
    });
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



// const fuck = [
//     ['“America is great because she is good.'],
//     ['If America ceases to be good, America will\ncease to be great,” wrote French political'],
//     ['scientist Alexis de Tocqueville in his 1835\nbook, “Democracy in America”.'],
//     ['The USA, he believed, offered equality that\nwas not seen in other nations.'],
//     ['The founding fathers of the U.S. had created\na form of ruling that was not able to be tyrannical,'],
//     ['that was chosen by the people and served the\npeople, and if it failed to do so it would'],
//     ['be removed.'],
//     ['This America was a long way from absolute\nmonarchies and from authoritarian government'],
//     ['presided over by powerful dictators.'],
//     ['It was supposed to embody what Thomas Jefferson\nwrote in the U.S Declaration of Independence,'],
//     ['that, “all men are created equal.”'],
//     ['With that in mind, welcome to this episode\nof the Infographics Show, Can a U.S. President'],
//     ['Go to Jail?'],
//     ['If all men are created equal, perhaps that\nmeans that all men should be treated as equals'],
//     ['when it comes to matters of justice.'],
//     ['That’s why there are laws, and no people\nin a democracy should be immune to punishment.'],
//     ['We could argue that the scales of justice\ndo seem to be tipped in favor of those that'],
//     ['have more money, to avoid close scrutiny by\nlaw enforcement or to hire brilliant legal'],
//     ['teams to perhaps undo wrongdoings.'],
//     ['Notwithstanding the sometimes mindboggling\nchicanery a very wealthy person might employ'],
//     ['to get them out of trouble, everyone in the\nUSA should be answerable to the same laws.'],
//     ['This must mean an American president can surely\ngo to jail, or prison.'],
//     ['Just so you know, jail and prison are sometimes\ninterchangeable words, but in the USA, jail'],
//     ['is usually the place you go to for a short\nstint before you have a court hearing or you’re'],
//     ['just serving a very short sentence.'],
//     ['Prison is the place you go to after you’ve\nbeen convicted of a crime.'],
//     ['Ok, so first of all, a “What If” question.'],
//     ['What if a U.S. President lost his mind and\nran out of the White House stark naked and'],
//     ['then started plunging a recently-procured\nWhite House kitchen knife into astounded tourists?'],
//     ['Could that President be charged and convicted\nof a number of crimes, say, attempted murder,'],
//     ['murder, and perhaps public indecency.'],
//     ['It’s not all that simple.'],
//     ['When the writers of the constitution drafted\ntheir timeless piece, they had to think of'],
//     ['what would happen if a president went off\nthe rails and committed a crime, or crimes.'],
//     ['Such wrongdoing, they said, might be “Treason,\nBribery, or other High Crimes and misdemeanors.”'],
//     ['If that should happen, they said, first there\nwould be impeachment by the House of Representatives'],
//     ['and then it would be up to the Senate to convict\nthe wrongdoer.'],
//     ['What this could mean is while the president\nis still in power, he can’t be indicted,'],
//     ['meaning the cops couldn’t just turn up outside\nthe White House, taser the wayward leader,'],
//     ['and detain him in one the city’s finest\njails until he had his day in court.'],
//     ['He first would have to be impeached and then\nremoved from office.'],
//     ['That would take some time.'],
//     ['After he has been removed, according to the\nconstitution, he, or she, will “be liable'],
//     ['and subject to Indictment, Trial, Judgment\nand Punishment, according to Law.”'],
//     ['But it is complicated.'],
//     ['If we look at the crime we described, it is\nperhaps too unbelievable to even discuss.'],
//     ['But would he be prosecuted if it happened?'],
//     ['One professor at Yale wrote this, “The framers\nimplicitly immunized a sitting president from'],
//     ['ordinary criminal prosecution.”'],
//     ['So again, he would have to be impeached first.'],
//     ['We don’t really know what would happen in\nthis case; perhaps an assumed enemy would'],
//     ['be blamed for somehow being able to control\nthe mind of the president.'],
//     ['We can safely say the President would be removed\nfrom active duties, although somewhere along'],
//     ['the proceedings the public would be told something\nnefarious had happened.'],
//     ['He’d probably be judged insane as a result\nof dark outside influences.'],
//     ['We really don’t know, and unfortunately\nno sources online have discussed the possibility'],
//     ['of such a heinous crime.'],
//     ['But this is an extreme case, so let’s look\nat something more down-to-Earth.'],
//     ['If we look at what was called high crime,\nthat’s different.'],
//     ['High crimes are usually things like perjury,\nbribery, abuse of power.'],
//     ['These things we certainly can imagine a president\ndoing.'],
//     ['According to U.S. legal scholar, Ronald Rotunda,\nif the President committed one of these high'],
//     ['crimes, he’d face the law.'],
//     ['Rotunda wrote, while investigating former\nPresident Clinton, “It is proper, constitutional,'],
//     ['and legal for a federal grand jury to indict\na sitting president for serious criminal acts'],
//     ['that are not part of, and are contrary to,\nthe president\'s official duties.'],
//     ['In this country, no one, even President Clinton,\nis above the law.”'],
//     ['Still, others disagree.'],
//     ['Time magazine in 2018 featured a story written\nby the former principal lawyer for Vice President'],
//     ['Spiro Agnew.'],
//     ['He wrote, “An imperial Presidency was the\nworst fear of the Founders.”'],
//     ['As we said, the founders knew tyranny was\nalways bound to happen when one person, or'],
//     ['group, had too much power and attendant impunity.'],
//     ['The constitution had to preclude that this\ntyranny, or corruption, never could happen.'],
//     ['The writer states again that first the president\nwould have to be impeached, then removed,'],
//     ['and he would then possibly face prison.'],
//     ['It’s just never happened.'],
//     ['The Atlantic also wrote a story in 2018, asking\nif a sitting president could be indicted.'],
//     ['That writer said there was no clear answer.'],
//     ['He decided to ask the question to six well-known\nlegal scholars, regarding if a sitting president'],
//     ['could be indicted.'],
//     ['Four answered.'],
//     ['Three said no and one said yes.'],
//     ['The writer turned to academics, and many answers\ncame back, some saying that indicting a president'],
//     ['would just be too disruptive.'],
//     ['Another disagreed, saying the constitution\nwas written so that such a disruption, when'],
//     ['needed, could occur.'],
//     ['Another said that no expert can answer the\nquestion, stating that one could only have'],
//     ['an opinion on this matter.'],
//     ['There is no airtight legal framework that\ncan guarantee an answer.'],
//     ['We apologize that we can’t ascertain a clear\nanswer to the question in this show, but it'],
//     ['seems there is nobody out there who knows.'],
//     ['The constitution was written so that a president\ncould face the law as you and I do, but while'],
//     ['in office it would seem that indicting a president\nwould be very hard to do.'],
//     ['That seems wrong to some, because if the founders\nhad wanted to give immunity to presidents,'],
//     ['that would have explicitly been written into\nthe constitution.'],
//     ['Perhaps the constitution should have some\nsmall print where it says, “All men are'],
//     ['created equal.”'],
//     ['In that small print we can read, “Subject\nto change without notice.'],
//     ['Not applicable outside of warranty.”']
// ];