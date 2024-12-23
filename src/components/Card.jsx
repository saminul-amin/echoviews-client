export default function Card({ service }) {
  const { image, title, company, website, description, category, price } =
    service;
  console.log(service);
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">See Details!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
