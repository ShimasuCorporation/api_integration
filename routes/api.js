//Require Dependencies
const express = require("express");
const request = require("request");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

////EventEmitter
// const aaa = new EventEmitter();
// const bbb = new EventEmitter();
const ccc = new EventEmitter();
// aaa.data = "Asd"
// bbb.data = "asdasd"
ccc.data = "12 23"
ccc.on("event", () => {
    console.log("Asasdasd");
});
// aaa.emit('event');
// bbb.emit('event');
// ccc.emit('event');
console.log(ccc.data);

//API Call -> Suggestion_Get_name
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



//API Call -> Get Transcript_Text
const result2 = new EventEmitter();
setTimeout(() => { //Delay the Resonse
    request(encodeURI(transcript_url), (err, response, body) => {
        const stage2 = JSON.parse(body);
        const text_val_array = [];
        for (let x in stage2) {
            text_val_array.push(`${stage2[x].text}`);
        };
        result2.data = text_val_array;
        result2.emit("up2");
    })
}, 5000); //by 5secs



//API Call -> Get Start Time
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

//Cleaning Function (Remove Repeated Val.)
function cf(x) {
    let cd = x.filter((a, b, c) => {
        return b == c.indexOf(a)
    });
    return cd;
};






result3.on("up3", () => { //1st Time
    result.on("up", () => { //2rd Name
        result2.on("up2", () => { //3nd Text
            console.log(result3.data);
            console.log(result.data);
            console.log(result2.data);

        });
    });

});
// //Final Matching
const blow_ass = new EventEmitter();
result2.on("up2", () => { //Call the Transcript EventEmitter
    // result3.on("up3", () => {
    result.on("up", () => { //Call the Suggestion EventEmitter  
        let splited = []; //Initialize the Array for Splited Transcript
        splited = spliter(result2.data); //Passd the Splited Data into the Array
        // console.log(result2.data.length); //Programming Trace
        let arry_final_1 = []; //Initialize the Array for the Final Matching-Short
        // let arry_final_2 = []; //Initialize the Array for the Final Matching-Long
        for (let index = 0; index < splited.length; index++) { //Iterate Through the Longer Array - Transcript
            for (let index2 = 0; index2 < result.data.length; index2++) { //Iterate Through the Shorter Array - Suggestion
                if (splited[index] == result.data[index2]) { //Find the Matching Value 
                    arry_final_1.push(result.data[index2]); //Push the Matching Value into the Final Array
                    // arry_final_2.push(splited[index]); //Push the Matching Value into the Final Array

                };
            };

        };
        result3.on("up3", () => {}); //Call the Time EventEmitter

        const tr2 = result3.data; //Time Data
        let tr = cf(arry_final_1); //Transcript Data

        //Time Match Func
        tr.filter((a, b, c) => {
            // console.log("first_step:" + " " + a, b, c, c.indexOf(a), b == c.indexOf(a));
            const rev_2 = b == c.indexOf(a) //arry1's repeated value assessment
            if (rev_2 == true) { //If not repeated 
                const first_arry_index = b; //The first array's index corresbonding to the repeated values 
                const fn = tr2[first_arry_index] //2nd array's value corresbonding to 1st array's index corresbonding to the its repeated values
                // console.log(fn, tr[b]); //Suggestion and Time Match
                blow_ass.data = [fn, tr[b]];
                // console.log(blow_ass.data)


            };
        })
    });

});





// const fs = require('fs');
// blow_ass.on("blow_ass", () => {
//     fs.writeFile("../test", blow_ass.data, function (err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     });
// });


//GET Resquest Handling


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

//Time Match Func
// function clear_num_2(x, y) {
//     x.filter((a, b, c) => {
//         // console.log("first_step:" + " " + a, b, c, c.indexOf(a), b == c.indexOf(a));
//         const rev_2 = b == c.indexOf(a) //arry1's repeated value assessment
//         if (rev_2 == true) { //If not repeated 
//             const first_arry_index = b; //The first array's index corresbonding to the repeated values 
//             const fn = y[first_arry_index] //2nd array's value corresbonding to 1st array's index corresbonding to the its repeated values
//             console.log(fn);
//         };
//     })
// };

//Time Output
// result3.on("up3", () => {
//     console.log(result3.data);
// });






// // //Final Matching
// const blow_ass = new EventEmitter();
// result2.on("up2", () => { //Call the Transcript EventEmitter
//     // result3.on("up3", () => {
//     result.on("up", () => { //Call the Suggestion EventEmitter  
//         let splited = []; //Initialize the Array for Splited Transcript
//         splited = spliter(result2.data); //Passd the Splited Data into the Array
//         // console.log(result2.data.length); //Programming Trace
//         let arry_final_1 = []; //Initialize the Array for the Final Matching-Short
//         // let arry_final_2 = []; //Initialize the Array for the Final Matching-Long
//         for (let index = 0; index < splited.length; index++) { //Iterate Through the Longer Array - Transcript
//             for (let index2 = 0; index2 < result.data.length; index2++) { //Iterate Through the Shorter Array - Suggestion
//                 if (splited[index] == result.data[index2]) { //Find the Matching Value 
//                     arry_final_1.push(result.data[index2]); //Push the Matching Value into the Final Array
//                     // arry_final_2.push(splited[index]); //Push the Matching Value into the Final Array

//                 };
//             };

//         };
//         result3.on("up3", () => {}); //Call the Time EventEmitter

//         const tr2 = result3.data; //Time Data
//         let tr = cf(arry_final_1); //Transcript Data

//         //Time Match Func
//         tr.filter((a, b, c) => {
//             // console.log("first_step:" + " " + a, b, c, c.indexOf(a), b == c.indexOf(a));
//             const rev_2 = b == c.indexOf(a) //arry1's repeated value assessment
//             if (rev_2 == true) { //If not repeated 
//                 const first_arry_index = b; //The first array's index corresbonding to the repeated values 
//                 const fn = tr2[first_arry_index] //2nd array's value corresbonding to 1st array's index corresbonding to the its repeated values
//                 // console.log(fn, tr[b]); //Suggestion and Time Match
//                 blow_ass.data = [fn, tr[b]];
//                 // console.log(blow_ass.data)


//             };
//         })
//     });

// });