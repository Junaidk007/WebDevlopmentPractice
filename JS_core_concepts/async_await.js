// async/await is just a nicer way to write promises.

async function getUser() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        // console.log(response);

        // throw new Error('custom error');

        let data = await response.json();
        console.log(data);

    } catch (error){
        console.log(error);
    }  

}

getUser();


let age = 5

if (age >= 18) {
    console.log('elegible')
} else {
    throw new Error("not elegible for vote")
}


