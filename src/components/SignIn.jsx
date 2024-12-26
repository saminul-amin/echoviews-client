import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const { setUser, userSignIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });
    
    userSignIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast("Sign In Successfull");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // alert("invalid credentials");
        toast("Invalid Credentials!");
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
      <div className="card bg-base-200 w-full max-w-lg shrink-0 rounded-2xl p-10 ">
        <h2 className="text-2xl font-semibold text-center">
          Login your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
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
            <label className="label">
              <Link className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral font-semibold text-lg text-white rounded-md">
              Sign In
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
          Dont't Have An Account? &nbsp;
          <Link className="text-red-500" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
