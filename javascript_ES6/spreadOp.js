let arr0 = [1, 2, 3];
let arr1 = [4, 5, 6];

// The JavaScript spread operator (...) allows us to quickly copy all or 
// part of an existing array or object into another array or object.

let combind = [...arr0, ...arr1];

for (el of combind) {
    console.log(el);
}