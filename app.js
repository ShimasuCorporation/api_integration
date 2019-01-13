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



//Play Ground
// function removeDuplicateUsingFilter(arr) { //Sanitization Function -> Remove Duplicates
//     let unique_array = arr.filter((elem, index, self) => {
//         // console.log(index, self, elem, self.indexOf(elem))
//         console.log(index == self.indexOf(elem));
//         return index == self.indexOf(elem);

//     });
//     return unique_array
// }


const arr1 = ["a", "b", "c", "d", "d", "d", "e", "r", "r"]; //Transcript
const arr2 = [1, 2, "lx", "wx", "xc", 6, "a", "xx", "x_x"] //Time
const arr3 = arr1.concat(arr2);
// console.log(arr3.length);
// console.log(removeDuplicateUsingFilter(arr1));
// console.log(removeDuplicateUsingFilter(arr1));

//Find repeated value
function clear_num(x, y) {
    x.filter((a, b, c) => {
        // console.log("first_step:" + " " + a, b, c, c.indexOf(a), b == c.indexOf(a));
        const rev = b == c.indexOf(a) //arry1's repeated value assessment
        if (rev == false) { //If repeated 
            const first_arry_index = b; //The first array's index corresbonding to the repeated values 
            const fn = y[first_arry_index] //2nd array's value corresbonding to 1st array's index corresbonding to the its repeated values
            console.log(fn);
        };
    })
};

//Find not repeated value
function clear_num_2(x, y) {
    x.filter((a, b, c) => {
        // console.log("first_step:" + " " + a, b, c, c.indexOf(a), b == c.indexOf(a));
        const rev_2 = b == c.indexOf(a) //arry1's repeated value assessment
        if (rev_2 == true) { //If not repeated 
            const first_arry_index = b; //The first array's index corresbonding to the repeated values 
            const fn = y[first_arry_index] //2nd array's value corresbonding to 1st array's index corresbonding to the its repeated values
            // console.log(fn);
        };
    })
};

// console.log(clear(arr1));
// clear_num(arr1, arr2);
clear_num_2(arr1, arr2);

// console.log(arr1.filter((a, b, c, ) => {
//     // console.log(b == c.indexOf(a))
//     console.log(a, b, c, c.indexOf(a), b == c.indexOf(a), arr1)
//     return b == c.indexOf(a);
// }));
// c -> the array, a- > the elements in the array, b -> the index of the element of array
// c.indexOf(a) -> within c (the array) the index of a(the elements of the original array), 
// b == c.indexOf(a) -> if within the array, the index of the orinal array equals to the index of the original elements of the array

// const arr3 = [];
// for (let index = 0; index < arr1.length; index++) {
//     for (let index2 = 0; index2 < arr2.length; index2++) {
//         if (arr1[index] == arr2[index2]) {
//             arr3.push(arr1[index]);
//         };
//     };
// };

// console.log(arr3);