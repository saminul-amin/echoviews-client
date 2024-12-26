import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicTitle from "./DynamicTitle";

export default function Root() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <DynamicTitle />
      <ToastContainer />
    </div>
  );
}
