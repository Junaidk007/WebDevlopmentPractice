// A callback is a function passed into another function, to be called later.

function getUser(callback) { // callback 1
  fetch("https://jsonplaceholder.typicode.com/users/1")

    .then(response => response.json()) // callback 2

    .then(data => callback(null, data)) // callback 3

    .catch(error => callback(error, null)); // callback 4
}


async function getUser(callback) { // callback 1
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/users/1")

    let data = await res.json();

    console.log(data)

  } catch (e) {
    console.log(e);
  }

}

// using callback
getUser((error, user) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("User:", user.name);
  }
});


