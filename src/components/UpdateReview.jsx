import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

export default function UpdateReview() {
  const location = useLocation();
  const service = location.state;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    const company = form.company.value;
    const website = form.website.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = form.price.value;

    const updatedService = {
      image,
      title,
      company,
      website,
      description,
      category,
      price,
    };
    console.log(updatedService);
    console.log(service._id);

    axios
      .put(
        `http://localhost:5000/update-service/${service._id}`,
        updatedService
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: "The service is updated successfully!",
            icon: "success",
          });
          navigate("/my-services");
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-200 w-full max-w-lg shrink-0 rounded-2xl p-10 ">
        <h2 className="text-2xl font-semibold text-center">
          Fill up this form to update the service
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Image URL</span>
            </label>
            <input
              name="image"
              type="url"
              placeholder="Enter the URL of the image of the Service"
              className="input input-bordered"
              defaultValue={service.image}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Title</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter the title of the Service"
              className="input input-bordered"
              defaultValue={service.title}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input
              name="company"
              type="text"
              placeholder="Enter the company name of the Service"
              className="input input-bordered"
              defaultValue={service.company}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Website</span>
            </label>
            <input
              name="website"
              type="url"
              placeholder="Enter the URL of the website of the Service"
              className="input input-bordered"
              defaultValue={service.website}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">A brief Description</span>
            </label>
            <input
              name="description"
              type="text"
              placeholder="Enter a brief description of the Service"
              className="input input-bordered"
              defaultValue={service.description}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Category</span>
            </label>
            <input
              name="category"
              type="text"
              placeholder="Enter the category of the Service"
              className="input input-bordered"
              defaultValue={service.category}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price of the Service</span>
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Enter the price of the Service"
              className="input input-bordered"
              defaultValue={service.price}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral font-semibold text-lg text-white rounded-md">
              Update Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
