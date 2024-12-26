import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      "/": "Home | EchoViews",
      "/all-services": "All Services | EchoViews",
      "/signin": "Sign In | EchoViews",
      "/signup": "Sign Up | EchoViews",
      "/add-service": "Add Service | EchoViews",
      "/my-reviews": "My Reviews | EchoViews",
      "/my-services": "My Services | EchoViews",
      "/services": "Services | EchoViews",
      "/service-details": "Service Details | EchoViews",
    };

    document.title = titleMap[location.pathname] || "EchoViews";
  }, [location]);

  return null;
};

export default DynamicTitle;
