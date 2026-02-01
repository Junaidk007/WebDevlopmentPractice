import LikeIcon from "../activity/LikeIcon";

function Card({ price, name, keyword }) {
    let keyw;
    if (keyword) {
        keyw = keyword.map((item, index) => <li key={index}>{item}</li>);
    }
    return ( 
        <div className="card">
            <h2>{name}</h2>
            <p>Price: ${price}</p>
            {keyword ? <ul>{keyw}</ul>: null}
            <LikeIcon/>
        </div>
     );
}

export default Card;