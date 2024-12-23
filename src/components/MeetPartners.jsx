import { useEffect, useState } from "react";
import Intro from "./Intro";

const heading = "Meet Our Partners";
const desc =
  "Explore our trusted partners who bring innovation and excellence to enhance your experience.";

export default function MeetPartners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch("/partners.json")
      .then((res) => res.json())
      .then((data) => setPartners(data));
  }, []);

  return (
    <div>
      <Intro heading={heading} desc={desc} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-5/6 mx-auto gap-12">
        {partners.map((company, idx) => (
          <div
            key={idx}
            className="p-5 border-2 border-gray-300 rounded-3xl inline-block"
          >
            <a href={company.link}>
              <img
                src={company.logo}
                alt={company.name}
                className="rounded-2xl w-32 h-32 mx-auto"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
