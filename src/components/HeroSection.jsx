import { useEffect, useState } from "react";
import Card from "./Card";

export default function HeroSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/fakeData.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  //   console.log(data);
  return (
    <div className="w-5/6 mx-auto mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((serv) => (
          <div>
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img src={serv.image} alt={serv.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{serv.title}</h2>
                <p>{serv.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">See Details!</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
