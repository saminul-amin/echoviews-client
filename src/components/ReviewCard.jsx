import { SlLike, SlDislike } from "react-icons/sl";

export default function ReviewCard({ review }) {
  return (
    <div>
      <div className="card bg-base-100 w-84 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{review.service.title}</h2>
          <p>{review.review}</p>
          <div className="flex justify-between mt-3">
            <div className="justify-start">
              <p className="italic text-gray-500">Posted by: {review.email}</p>
              <p className="italic text-gray-500">Posted on: {review.date}</p>
            </div>
            <div className="justify-end">
              <div className="join">
                <button className="btn join-item">
                  <SlLike />
                </button>
                <button className="btn join-item">
                  <SlDislike />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
