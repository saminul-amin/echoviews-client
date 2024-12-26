import { useContext, useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";

import Intro from "./Intro";
import Rating from "./Rating";
import Swal from "sweetalert2";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SlLike, SlDislike } from "react-icons/sl";

const heading = "My Reviews";
const desc =
  "Explore detailed feedback and insights on various services,\nshowcasing experiences and evaluations all in one place!";

export default function MyReviews() {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState({});
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const textAreaRef = useRef(null);
  const [rating, setRating] = useState(null);
  const [updatedReview, setUpdatedReview] = useState("");
  const axiosSecure = useAxios();
  const email = user.email;

  useEffect(() => {
    axiosSecure
      .get("my-reviews", {
        params: { email: email },
      })
      .then((res) => console.log(res.data));
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`my-reviews?email=${email}`)
      .then((res) => setData(res.data));
  }, []);

  const handleRatingChange = (rate) => {
    setRating(rate);
  };
  // console.log(rating);

  const handleDelete = (id) => {
    axiosSecure.delete(`my-reviews/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your review has been deleted successfully!",
          icon: "success",
        });
      }
    });
  };

  const openModal = (review) => {
    setReview(review);
    setRating(review.rating);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleUpdateReview = (id) => {
    // console.log(updatedReview);
    // console.log(rating);
    // console.log(id);
    const review = updatedReview;

    const newReview = { review, rating };

    axiosSecure.put(`my-reviews/${id}`, newReview).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: "The review is updated successfully!",
          icon: "success",
        });
        closeModal();
      }
    });
  };

  const handleClose = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Changes won't be saved!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        closeModal();
      }
    });
  };

  return (
    <div className="w-5/6 mx-auto">
      <Intro heading={heading} desc={desc} />
      {/* {data.length} */}
      <div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((review) => (
            <div key={review._id}>
              <div className="card bg-base-100 w-84 h-[320px] lg:h-72 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{review.service.title}</h2>
                  <p>{review.review}</p>
                  <div className="flex justify-between items-center gap-2 mt-3">
                    <div className="justify-start">
                      <p className="italic text-gray-500">
                        Posted on: {review.date}
                      </p>
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
                <div className="join mx-auto mb-5">
                  <button
                    className="btn join-item text-xl"
                    onClick={() => openModal(review)}
                  >
                    <FaEdit />{" "}
                    <span className="text-lg lg:inline hidden">
                      Update Review
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn join-item text-xl"
                  >
                    <MdDelete />{" "}
                    <span className="text-lg lg:inline hidden">
                      Delete Review
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-center">
              {review.service.title}
            </h2>
            <div className="bg-base-200 p-5 rounded-xl">
              <textarea
                ref={textAreaRef}
                className="textarea textarea-bordered w-full"
                placeholder="Write a Review..."
                defaultValue={review.review}
                onChange={(e) => setUpdatedReview(e.target.value)}
              ></textarea>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  Give a Rating: <Rating onRatingChange={handleRatingChange} />
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="btn" onClick={handleClose}>
                Close
              </button>
              <button
                className="btn"
                onClick={() => handleUpdateReview(review._id)}
              >
                Update Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div className="join join-vertical">
  <button className="btn join-item text-xl" onClick={() => openModal(review)}>
    <FaEdit />
  </button>
  <button
    onClick={() => handleDelete(review._id)}
    className="btn join-item text-xl"
  >
    <MdDelete />
  </button>
</div>; */
}
