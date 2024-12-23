export default function Intro({ heading, desc }) {
  return (
    <div>
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold">{heading}</h2>
        <p className="text-lg mt-3 mb-8">{desc}</p>
        <hr className="w-5/6 mx-auto mb-16" />
      </div>
    </div>
  );
}
