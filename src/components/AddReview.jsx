import { useContext, useRef, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxios from "../hooks/useAxios";
import Rating from "./Rating";

export default function AddReview({ service }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
  const axiosSecure = useAxios();
  const textAreaRef = useRef(null);

  if (user === null) return;

  const email = user.email;
  const date = new Date().toISOString().slice(0, 10);

  const handleRatingChange = (rate) => {
    setRating(rate);
  };
  // console.log(rating);

  const handleAddReview = () => {
    const data = { review, rating, email, date, service };
    // console.log(data);
    axiosSecure.post("reviews", data).then((res) => {
      if (res.data.insertId) {
        console.log("added");
      }
    });
    textAreaRef.current.value = "";
  };

  return (
    <div className="mt-24 w-2/3 mx-auto">
      <div className="bg-base-200 p-5 rounded-xl">
        <textarea
          ref={textAreaRef}
          className="textarea textarea-bordered w-full"
          placeholder="Write a Review..."
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className="mt-2">
          <div className="flex justify-between items-center">
            Give a Rating: <Rating onRatingChange={handleRatingChange} />
          </div>
        </div>
        <div className="text-end">
          <button onClick={handleAddReview} className="btn mt-2">
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
}
