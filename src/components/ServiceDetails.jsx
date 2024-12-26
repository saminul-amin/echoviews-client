import { useLocation } from "react-router-dom";
import Intro from "./Intro";
import AddReview from "./AddReview";
import AllReviews from "./AllReviews";
import { motion } from "framer-motion";

export default function ServiceDetails() {
  const location = useLocation();
  const service = location.state;
  const { image, title, company, website, description, category, price } =
    service;

  const heading = title;
  const desc =
    "Delivering professional solutions tailored to your needs, with a focus on quality, creativity, and results-driven outcomes.";

  return (
    <div className="w-5/6 mx-auto">
      <Intro heading={heading} desc={desc} />

      <motion.div initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}>
        <div className="w-2/3 mx-auto card lg:card-side grid grid-cols-1 lg:grid-cols-2 bg-base-100 shadow-xl">
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
      </motion.div>

      <AddReview service={service} />
      <AllReviews title={service.title} />
    </div>
  );
}
