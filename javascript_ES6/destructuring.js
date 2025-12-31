// Destructuring is a JavaScript feature that allows you to extract values from objects or arrays into distinct variables

let arr = ['BMW', 'Audi', 'Mercedies', 'Ferari']

let obj = {
    name: 'junaid khan',
    coures: 'bcads24',
    rollno: 1240258209
}

// old method to access elements

// for arrays

let car1 = arr[1];
let car2 = arr[2];

console.log(`${car1}, ${car2}`);

// for objects

let student = obj.name;
let batch = obj.coures;

console.log(`${student}, ${batch}`);

console.log("\n----------------------------\n")

// Now new method for access elemnts

// for arrays

let [car0, car3, car4, car5] = arr;

console.log(car0);

// for objects

let {name, coures, rollno} = obj;

console.log(`${name}, ${rollno}`);