import { useContext, useEffect, useState } from "react";
import Intro from "./Intro";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const heading = "My Services";
const desc =
  "Discover the services I've added so far. Browse the table below for detailed insights into each service,\ntailored to meet diverse needs and requirements.";
const description = <pre>{desc}</pre>;

export default function MyServices() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const email = user.email;

  useEffect(() => {
    axios
      .get("http://localhost:5000/my-services", {
        params: { email: email },
      })
      .then((res) => console.log(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/my-services?email=${email}`)
      .then((res) => setData(res.data));
  }, [data]);

  const handleEdit = (service) => {};

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/my-services/${id}`).then((res) => {
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
                <th>Company Name</th>
                <th>Category</th>
                <th className="text-center">Brief Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((service, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{service.title}</td>
                  <td>{service.company}</td>
                  <td>{service.category}</td>
                  <td className="text-center">{service.description}</td>
                  <td>
                    <div className="join join-vertical">
                      <Link to={"/update-service"} state={service}>
                        <button className="btn join-item text-xl">
                          <FaEdit />
                        </button>
                      </Link>
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
    </div>
  );
}
