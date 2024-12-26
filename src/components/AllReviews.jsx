import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import ReviewCard from "./ReviewCard";

export default function AllReviews({ title }) {
  const [allReviews, setAllReviews] = useState([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    axiosSecure.get("reviews").then((res) => setAllReviews(res.data));
  }, []);
  //   console.log(allReviews);

  const filteredReviews = allReviews.filter(
    (review) => review.service.title === title
  );
  //   console.log(filteredReviews);

  return (
    <div className="mt-8 w-2/3 mx-auto">
      <div>
        <h2 className="text-2xl">
          Reviews on <span className="font-semibold">{title}</span>
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
