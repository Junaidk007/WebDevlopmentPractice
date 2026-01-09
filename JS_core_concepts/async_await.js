// async/await is just a nicer way to write promises.

async function getUser() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        let data = await response.json();
        console.log(data.name);
    } catch (e){
        console.log(e);
    }  

}

getUser();