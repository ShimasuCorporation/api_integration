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
const arr2 = [1, 2, 3, 4, 5] //Time
const arr3 = arr1.concat(arr2);
// console.log(arr3.length);
// console.log(removeDuplicateUsingFilter(arr1));
// console.log(removeDuplicateUsingFilter(arr1));

console.log(arr1.filter((a, b, c, ) => {
    // console.log(b == c.indexOf(a))
    console.log(a, b, c, c.indexOf(a), b == c.indexOf(a), arr1)
    return b == c.indexOf(a);
}));
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