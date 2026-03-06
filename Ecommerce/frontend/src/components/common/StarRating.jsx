import React from "react";
import { FaStar } from "react-icons/fa";

function StarRating({ rating, setRating }) {

  return (
    <div className="flex gap-2">
      {[1,2,3,4,5].map((star)=>(
        <FaStar
          key={star}
          size={22}
          onClick={()=>setRating(star)}
          className="cursor-pointer"
          color={star <= rating ? "gold" : "gray"}
        />
      ))}
      
    </div>

  );
}

export default StarRating;