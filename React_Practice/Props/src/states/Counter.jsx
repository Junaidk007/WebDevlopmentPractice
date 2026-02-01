import { useState } from "react";

function Counter() {
    let [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount((currCount) => (count + 1));
    }

    return ( 
        <div>
            <h2>Count: {count}</h2>
            <button onClick={incrementCount}>Increment</button>
            &nbsp;&nbsp;
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
     );
}

export default Counter;