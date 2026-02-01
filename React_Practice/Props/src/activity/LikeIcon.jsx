import { useState } from "react";

function LikeIcon() {
    const [isLiked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!isLiked);
    }  

    return ( 
        <i onClick={toggleLike} className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={isLiked ? { color: "#ff0000" } : {}} ></i>
     );
}
        
export default LikeIcon;