let arr0 = [1, 2, 3];
let arr1 = [4, 5, 6];
let arr2 = [7, 8, 9]

// The JavaScript spread operator (...) allows us to quickly copy all or 
// part of an existing array or object into another array or object.

let combind = [...arr0, ...arr1, ...arr2, 555];

// for (el of combind) {
//     console.log(el);
// }

let obj = {
    name: 'xayah',
    rollNo: 25,
    class2: 5
}

let obj2 = {...obj, name: 'junaid', marks: 'math'}

console.log(obj2)