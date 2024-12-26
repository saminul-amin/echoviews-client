import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
// import "./Theme.css";

export default function Navbar() {
  const { user, userSignOut, loading } = useContext(AuthContext);
  //   const [theme, setTheme] = useState("light");

  //   useEffect(() => {
  //     document.documentElement.setAttribute("data-theme", theme);
  //   }, [theme]);

  //   const toggleTheme = () => {
  //     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  //   };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline bg-base-200 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "underline bg-base-200 font-bold" : ""
          }
        >
          Services
        </NavLink>
      </li>
      {user?.email && (
        <li>
          <NavLink
            to="/add-service"
            className={({ isActive }) =>
              isActive ? "underline bg-base-200 font-bold" : ""
            }
          >
            Add Service
          </NavLink>
        </li>
      )}
      {user?.email && (
        <li>
          <NavLink
            to="/my-services"
            className={({ isActive }) =>
              isActive ? "underline bg-base-200 font-bold" : ""
            }
          >
            My Services
          </NavLink>
        </li>
      )}
      {user?.email && (
        <li>
          <NavLink
            to="/my-reviews"
            className={({ isActive }) =>
              isActive ? "underline bg-base-200 font-bold" : ""
            }
          >
            My Reviews
          </NavLink>
        </li>
      )}
    </>
  );
  //   console.log(user);

  return (
    <div>
      <div className="navbar bg-base-100 md:w-5/6 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to={"/"}
            className="btn btn-ghost text-xl animate__animated animate__flash"
          >
            EchoViews
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        {user && user?.email ? (
          <div className="navbar-end gap-3">
            <div className="flex gap-2 bg-base-300 px-4 py-2 rounded-xl items-center group">
              <img
                className="w-9 h-9 rounded-full"
                src={user?.photoURL}
                alt=""
              />
              <p className="hidden group-hover:block">{user.displayName}</p>
            </div>
            <button
              onClick={userSignOut}
              className="bg-base-300 px-4 py-3 rounded-xl"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="navbar-end gap-3">
            <Link to={"/signin"}>
              <button className="bg-base-300 px-4 py-3 rounded-xl">
                Sign In
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="bg-base-300 px-4 py-3 rounded-xl">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
