import { Link } from "react-router-dom";

export default function Card({ service }) {
  const { image, title, company, website, description, category, price } =
    service;
  //   console.log(service);
  return (
    <div>
      <div className="card bg-base-100 w-80 md:w-84 lg:w-88 xl:w-96 shadow-xl">
        <figure>
          <img src={image} alt={title} className="h-96 rounded-2xl w-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <Link to={"/service-details"} state={service}>
              <button className="btn">See Details!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
