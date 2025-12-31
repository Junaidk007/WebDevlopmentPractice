let arr = [1, 2, 3, 4, 5]

let newArr = arr.map(x => x*x);   // map function updates each elment for array with new one
// in this x is the element and x*x is the updated value.

for (x in newArr) { // this loop gives index of each element in array
    console.log(x);
}

console.log("\n--------------------------------------\n")

for (x of newArr) { // this loop directly gives array elements
    console.log(x);
}