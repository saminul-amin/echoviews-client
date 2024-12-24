import { useLocation } from "react-router-dom";
import Intro from "./Intro";
import AddReview from "./AddReview";

export default function ServiceDetails() {
  const location = useLocation();
  const service = location.state;
  const { image, title, company, website, description, category, price } =
    service;

  const heading = title;
  const desc =
    "Delivering professional solutions tailored to your needs, with a focus on quality, creativity, and results-driven outcomes.";

  return (
    <div>
      <Intro heading={heading} desc={desc} />

      <div>
        <div className="w-1/2 mx-auto card lg:card-side grid grid-cols-1 lg:grid-cols-2 bg-base-100 shadow-xl">
          <figure>
            <img
              src={image}
              alt={title}
              className="w-full aspect-auto rounded-2xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-4xl">{title}</h2>
            <p className="italic text-lg">{company}</p>
            <p>{description}</p>
            <p>Category: {category}</p>
            <p>Price: ${price}</p>
            <p>Visit <a href={website}>{website}</a> for more!</p>
          </div>
        </div>
      </div>

      <AddReview service={service} />
    </div>
  );
}
