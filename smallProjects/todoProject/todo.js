let task = document.getElementById("task");
let addBtn = document.getElementById("add");
let ulList = document.getElementById("list");

let handelAddBtn = () => {
    if (task.value === '') return;

    let li = document.createElement('li');
    let delBtn = document.createElement('button');
    delBtn.innerText = "remove";
    delBtn.classList.add('delete');
    li.innerText = task.value;
    li.classList.add('tsk');

    delBtn.addEventListener('click', () => {
        li.remove();
    })

    ulList.appendChild(li);
    li.appendChild(delBtn);
    task.value = "";
}

addBtn.addEventListener('click', handelAddBtn);
task.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handelAddBtn();
    }
})



