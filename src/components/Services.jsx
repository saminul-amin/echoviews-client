import { useLoaderData } from "react-router-dom";
import Intro from "./Intro";
import Card from "./Card";

const heading = "Services Tailored for You";
const desc =
  "Discover a range of services designed to meet your needs and elevate your projects to the next level.";

export default function Services() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <Intro heading={heading} desc={desc} />

      <div className="w-5/6 mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service, idx) => (
            <Card key={idx} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
