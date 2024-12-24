import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      "/": "Home | MovieScapes",
      "/all-movies": "All Movies | MovieScapes",
      "/signin": "Sign In | MovieScapes",
      "/signup": "Sign Up | MovieScapes",
      "/offers": "Student Offers | MovieScapes",
      "/add-movie": "Add Movie | MovieScapes",
      "/favorites": "My Favorites | MovieScapes",
      "/movie-detail": "Movie Details | MovieScapes",
    };

    document.title = titleMap[location.pathname] || "MovieScapes";
  }, [location]);

  return null;
};

export default DynamicTitle;
