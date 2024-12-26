import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";

export default function HeroSection() {
  const [data, setData] = useState([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    axiosSecure.get("limited-services").then((res) => setData(res.data));
  }, []);

  return (
    <div className="w-5/6 mx-auto">
      <h2 className="text-center text-4xl font-semibold">Featured Services</h2>
      <p className="text-center mt-3 mb-16 text-lg">
        Explore our top-rated services, chosen to deliver exceptional quality
        and value.
        <br /> Find the perfect solution for your needs today!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((service) => (
          <Card key={service._id} service={service} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to={"/services"}>
          <button className="btn">See More...</button>
        </Link>
      </div>
    </div>
  );
}
