import { useState } from "react";

function ReatcForm() {
    const [name, setName] = useState("");

    const handelNameChange = (e) => {
        setName(e.target.value);
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        setName('')
    }
    return (
        <form action="" onSubmit={handelSubmit}>
            <div className="inp1">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handelNameChange} value={name}/>
            </div>
            <button>Submit</button>
        </form>
    );
}

export default ReatcForm;