import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxios from "../hooks/useAxios";
import Intro from "./Intro";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const heading = "My Services";
const desc =
  "Discover the services I've added so far. Browse the table below for detailed insights into each service,\ntailored to meet diverse needs and requirements.";

export default function MyServices() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState({});
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const axiosSecure = useAxios();

  const email = user.email;

  useEffect(() => {
    axiosSecure
      .get("my-services", {
        params: { email: email },
      })
      .then((res) => console.log(res.data));
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`my-services?email=${email}`)
      .then((res) => setData(res.data));
  }, [data]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };
  const searchedData = data.filter(
    (service) =>
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleEdit = (service) => {
    setService(service);
    openModal();
  };

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

    axiosSecure
      .put(`update-service/${service._id}`, updatedService)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: "The service is updated successfully!",
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

  const handleDelete = (id) => {
    axiosSecure.delete(`my-services/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your service has been deleted successfully!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="w-5/6 mx-auto">
      <Intro heading={heading} desc={desc} />
      {/* {data.length} */}
      <div className="flex items-center justify-end my-8">
        <input
          type="text"
          className="border-gray-500 border-2 rounded-xl py-3 px-4 w-1/3"
          placeholder="Search..."
          onChange={handleChange}
          value={search}
        />
      </div>
      <div className={searchedData.length ? "inline" : "hidden"}>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-lg">
                <th></th>
                <th>Service Title</th>
                <th>Company Name</th>
                <th>Category</th>
                <th className="text-center">Brief Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {searchedData.map((service, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{service.title}</td>
                  <td>{service.company}</td>
                  <td>{service.category}</td>
                  <td className="text-center">{service.description}</td>
                  <td>
                    <div className="join join-vertical">
                      {/* <Link to={"/update-service"} state={service}> */}
                      <button
                        onClick={() => handleEdit(service)}
                        className="btn join-item text-xl"
                      >
                        <FaEdit />
                      </button>
                      {/* </Link> */}
                      <button
                        onClick={() => handleDelete(service._id)}
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
        <div className="p-6 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="my-16 bg-white rounded-lg shadow-lg p-6 w-1/2 relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-center">
              Fill up the form to update service
            </h2>
            <div>
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
                <div className="form-control mt-6 grid grid-cols-2 gap-6">
                  <button className=" btn btn-neutral font-semibold text-lg text-white rounded-md">
                    Update
                  </button>
                  <button className="btn" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </form>
            </div>
            {/* <div className="flex justify-center space-x-4">
              <button className="btn" onClick={handleClose}>
                Close
              </button>
              <button className="btn" onClick={() => handleUpdateService()}>
                Update Service
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
