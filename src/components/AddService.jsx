import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

export default function AddService() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
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
    const date = new Date().toISOString().slice(0, 10);
    const email = user?.email;

    const service = {
      image,
      title,
      company,
      website,
      description,
      category,
      price,
      date,
      email,
    };
    console.log(service);

    axiosSecure.post("services", service).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "The service is added successfully!",
          icon: "success",
        });
        navigate("/services");
      }
    });
  };

  return (
    <div className="mt-12 min-h-screen flex justify-center items-center">
      <div className="card bg-base-200 w-full max-w-xl shrink-0 rounded-2xl p-10 ">
        <h2 className="text-2xl font-semibold text-center">
          Fill up this form to add new service
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
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral font-semibold text-lg text-white rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
