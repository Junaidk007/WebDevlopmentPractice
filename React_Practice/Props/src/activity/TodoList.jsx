import { useState } from "react";

function TodoList() {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);

    const handelOnChange = (e) => {
        let value = e.target.value;
        setTask(() => {
            return value;
        })
    }

    const handelClick = () => {
        setList((currList) => {
            return [...currList, task]
        })

        setTask("");
    }

    for (let i in list) {
        console.log(list[i]);
    }
    return (
        <div>
            <h2>Todo List</h2>
            <input type="text" name="task" value={task} onChange={handelOnChange} />
            <button onClick={handelClick}>Add</button>
            <hr />
            <h3>Your Tasks:</h3>
            <ul>
                {list.map((item, index) => {
                    return (<li key={index}>{item} <button onClick={() => {
                        setList((currList) => {
                            return currList.filter((_, i) => i !== index);
                        })
                    }}>Delete</button></li>);
                })}
            </ul>
        </div>
    );
}

export default TodoList;