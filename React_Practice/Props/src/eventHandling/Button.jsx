function Button() {

    const handleClick = () => {
        alert("Hello, welcome to our website!");
    }
    return ( 
        <div>
            <button onClick={handleClick}>Send Greet!</button>
        </div>
     );
}

export default Button;