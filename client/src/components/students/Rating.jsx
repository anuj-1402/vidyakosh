import React, { useEffect } from "react";
import { useState } from "react";

const Rating = ({ initialRating ,onRate}) => {
  const [rating, setRating] = useState(initialRating);
  const handleRating = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };
  useEffect(() => {
   if (initialRating) {
     setRating(initialRating);
   }
  }, [initialRating]);
  return <div>

    {Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return <span onClick={() => handleRating(starValue)} key={index} className={`text-xl sm:text-2xl cursor-pointer  ${starValue <= rating ? "text-yellow-500" : "text-gray-00"}`}>&#9733;</span>;
    })}
  </div>;
};

export default Rating;
