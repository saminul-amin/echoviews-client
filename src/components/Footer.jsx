import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="mt-16 pb-16 text-center bg-base-300 rounded-t-2xl">
      <h2 className="pt-8 text-3xl font-bold">EchoViews</h2>
      <p className="text-gray-500 mx-3 md:mx-0 my-6 font-semibold text-lg">
        Express your experiences, connect with others, and amplify your voice
        <br />
        through impactful reviews.
      </p>
      <hr className="my-5 w-11/12 mx-auto" />
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 justify-center">
        <div>
          <h6 className="font-bold text-lg mb-4">Services</h6>
          <ul>
            <li>Feedback & Support</li>
            <li>Discover Services</li>
            <li>Submit a review</li>
            <li>How it works</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold text-lg mb-4">Company</h6>
          <ul>
            <li>About Us</li>
            <li>Other Projects</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold text-lg mb-4">Legal</h6>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center gap-12 mt-8 text-4xl">
        <FaFacebookF />
        <FaXTwitter />
        <FaYoutube />
        <FaInstagram />
      </div>
    </div>
  );
}
