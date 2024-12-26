import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";

import Root from "../components/Root";
import ErrorPage from "../components/ErrorPage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Home from "../components/Home";
import Services from "../components/Services";
import ServiceDetails from "../components/ServiceDetails";
import AddService from "../components/AddService";
import MyServices from "../components/MyServices";
import MyReviews from "../components/MyReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
        loader: () => fetch("https://echoviews.vercel.app/services"),
      },
      {
        path: "service-details",
        element: <ServiceDetails />,
      },
      {
        path: "my-services",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
