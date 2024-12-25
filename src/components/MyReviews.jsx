import { useContext, useEffect, useRef, useState } from "react";
import Intro from "./Intro";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Swal from "sweetalert2";

const heading = "My Reviews";
const desc =
  "Explore detailed feedback and insights on various services,\nshowcasing experiences and evaluations all in one place!";
const description = <pre>{desc}</pre>;

export default function MyReviews() {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState({});
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const textAreaRef = useRef(null);
  const [rating, setRating] = useState(null);
  const [updatedReview, setUpdatedReview] = useState("");
  const email = user.email;

  useEffect(() => {
    axios
      .get("http://localhost:5000/my-reviews", {
        params: { email: email },
      })
      .then((res) => console.log(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/my-reviews?email=${email}`)
      .then((res) => setData(res.data));
  }, []);

  const handleRatingChange = (rate) => {
    setRating(rate);
  };
  // console.log(rating);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/my-reviews/${id}`).then((res) => {
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

    axios
      .put(`http://localhost:5000/my-reviews/${id}`, newReview)
      .then((res) => {
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
    <div>
      <Intro heading={heading} desc={description} />
      {/* {data.length} */}
      <div className="w-5/6 mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-lg">
                <th></th>
                <th>Service Title</th>
                <th className="text-center">Review</th>
                <th>Rating</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((review, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{review.service.title}</td>
                  <td>{review.review}</td>
                  <td>{review.rating}</td>
                  <td>{review.date}</td>
                  <td>
                    <div className="join join-vertical">
                      {/* <Link to={"/update-review"} state={review}> */}
                      <button
                        className="btn join-item text-xl"
                        onClick={() => openModal(review)}
                      >
                        <FaEdit />
                      </button>
                      {/* </Link> */}
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn join-item text-xl"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
