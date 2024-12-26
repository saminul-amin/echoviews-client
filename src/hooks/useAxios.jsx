import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://echoviews.vercel.app/",
  withCredentials: true,
});

export default function useAxios() {
//   const { userSignOut } = useContext(AuthContext);
//   const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
        //   userSignOut()
        //     .then(() => {
        //       navigate("/signIn");
        //     })
        //     .catch((error) => console.log(error));
        console.log(err);
        }
        return Promise.reject(err);
      }
    );
  }, []);

  return axiosInstance;
}
