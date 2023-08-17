import { useState, useContext } from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import ContextPage from "../ContextPage";
import { motion } from "framer-motion";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import User from "../assets/images/User.jpg";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

function Navbar() {
  const { header, user } = useContext(ContextPage);
  const [activeMobile, setActiveMobile] = useState(false);

  // console.log(header)
  const NavData = [
    {
      id: 1,
      headerName: "Genres",
      Name: "Genres",
      link: "/",
    },
    {
      id: 2,
      headerName: "Trending Movies",
      Name: "Trending",
      link: "/trending",
    },
    {
      id: 3,
      headerName: "Upcoming Movies",
      Name: "Upcoming",
      link: "/upcoming",
    },
    {
      id: 4,
      headerName: "Favorite Movies",
      Name: "Favorites",
      link: "/favorite",
    },
  ];

  return (
    <>
      {/* mobilebutton */}
      <button
        className="z-40 text-3xl text-black fixed right-0 bottom-0 m-6 p-4 duration-150 rounded-full active:scale-90 bg-white block md:hidden"
        onClick={() => setActiveMobile(!activeMobile)}
      >
        {activeMobile ? <HiX /> : <HiMenuAlt1 />}
      </button>

      <nav
        className={`${
          activeMobile ? "block" : "hidden"
        } fixed bg-navbarBg0/90 md:bg-navbarBg0 h-full w-full md:w-[15rem] z-30 md:block`}
      >
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="logo flex flex-col justify-center items-center m-7 gap-2"
            onClick={() => setActiveMobile(!activeMobile)}
          >
            <img src={logo} alt="logo" className="w-24" />
            <h1 className="text-indigo-200 font-bold text-2xl text-center">
              React Movie App
            </h1>
          </Link>
        </motion.div>

        <ul className=" font-semibold text-[16px] text-[rgba(2,0,36,1)] text-center px-5">
          {NavData.map((data) => (
            <NavLink key={data.id} to={data.link}>
              <li
                className={`${
                  header == data.headerName
                    ? "bg-[rgba(2,0,36,1)] text-white border-blue-600"
                    : "bg-genreBg text-[rgba(2,0,36,1)] border-black"
                } p-2 my-2  hover:bg-[rgba(2,0,36,1)] hover:text-white rounded-[20px] border-2 hover:border-blue-600`}
                onClick={() => setActiveMobile(!activeMobile)}
              >
                {data.Name}
              </li>
            </NavLink>
          ))}
        </ul>

        {/* Loginsection */}

        <div className="absolute bottom-0 w-full p-5 md:p-2 text-white">
          {user ? (
            <>
              <div className="w-full bg-gray-900 px-5 py-2 gap-4 rounded-xl flex items-center font-semibold border-2 border-blue-100/10">
                <img
                  src={user.photoURL == null ? User : user.photoURL}
                  alt="user"
                  className="h-10 rounded-full"
                />
                <h1>{user.displayName}</h1>
              </div>

              <div
                className="cursor-pointer bg-red-500 flex justify-center items-center p-2 rounded-xl mt-2"
                onClick={() => auth.signOut(toast.error("Logout successfully"))}
              >
                <h1>Logout</h1>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="w-full bg-gray-900 py-2 gap-4 rounded-xl flex items-center justify-center font-semibold border-2 border-blue-100/10"
                onClick={() => setActiveMobile(!activeMobile)}
              >
                <h1>Log in</h1>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
