import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Login from "./auth/Login";
import Navbar from "./components/Navbar";
import Container from "./pages/Container";
import Trending from "./pages/Trending";
import Upcoming from "./pages/Upcoming";
import Favorite from "./pages/Favorite";
import { MovieProvider } from "./ContextPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <MovieProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <Navbar />
      <div className="md:ml-[15rem]">
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/moviedetail/:id" element={<MovieDetail />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </div>
    </MovieProvider>
  );
}

export default App;
