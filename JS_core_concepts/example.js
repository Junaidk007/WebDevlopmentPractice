console.log('start')


console.log('process 1')

// setTimeout(() => {
//     console.log('process 2')
// }, 3000);


console.log('end');


let myPromise = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve("Data received");
    }, 2000);

});

console.log(myPromise);

myPromise.then(data => {
    console.log(data);
});

setTimeout(() => {
    console.log(myPromise);
}, 3000)