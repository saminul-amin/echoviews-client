import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function SignUp() {
  const { createNewUser, setUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPassError(
        "Password MUST have an uppercase letter and a lowercase letter and MUST be of at least 6 characters"
      );
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
            toast("Sign Up Successfull");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        // console.log(err);
        toast("Something went wrong. Try Again!");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast("Sign In Successfull");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast("Sign In Failed. Try Again!");
        // console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-200 w-full max-w-lg shrink-0 rounded-2xl p-10">
        <h2 className="text-2xl font-semibold text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter Your Full Name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter the URL of Your Photo"
              className="input input-bordered"
              required
            />
          </div>
          {/* email input  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="input input-bordered"
              required
            />
          </div>
          {passError !== "" && (
            <label className="label text-sm text-red-600">{passError}</label>
          )}

          <div className="form-control mt-6">
            <button className="btn btn-neutral font-semibold text-lg text-white rounded-none">
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-2 mb-4 mx-8">
          <button
            onClick={handleGoogleSignIn}
            className="w-full btn btn-neutral font-semibold text-lg text-white rounded-md"
          >
            <FcGoogle />
            Sign In With Google
          </button>
        </div>
        <p className="text-center font-semibold">
          Already Have An Account? &nbsp;
          <Link className="text-red-500" to="/signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
