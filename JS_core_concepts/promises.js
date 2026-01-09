// A Promise represents a value that will be available in the future.

function getUser() {
  return fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json());
}

getUser()
  .then(user => {
    console.log("User:", user.name);
  })
  .catch(error => {
    console.log("Error:", error);
  });
  