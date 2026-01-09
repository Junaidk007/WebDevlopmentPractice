// Closure means:
// A function remembers the variables of its outer function, even after the outer function has finished executing.
// Closure enables Encapsulation in JS

function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
} 

let counter = outer();

counter();
counter();
counter();
counter();