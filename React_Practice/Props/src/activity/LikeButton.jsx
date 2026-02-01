import { useState } from "react";

function LikeButton() {
    const [isLiked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!isLiked);
    }
    return (
        <div>
            <button onClick={toggleLike}>
                {
                    isLiked ? (
                        <i className="fa-solid fa-heart" style={{ color: "#ff0000" }}></i>
                    ) : (
                        <i className="fa-regular fa-heart"></i>
                    )
                }
            </button>
        </div>
    );
}

export default LikeButton;