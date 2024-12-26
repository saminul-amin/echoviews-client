import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Card from "./Card";

export default function SearchResult({ keyword }) {
  const [services, setServices] = useState([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    axiosSecure
      .get("search", {
        params: { keyword: keyword },
      })
      .then((res) => setServices(res.data));
  }, [keyword]);

  return (
    <div className="w-5/6 mx-auto mt-16">
      <p className="my-8 text-lg">Search Results: {services.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}
