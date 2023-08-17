import  { useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import MovieCard from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import Genre from "./Genre";
import Header from "./Header";
import PageBtn from "./PageBtn";

function Movies() {
  const { movies, filteredGenre, activeGenre, loader, page } =
    useContext(ContextPage);

  useEffect(() => {
    filteredGenre();
  }, [activeGenre, page]);

  return (
    <div className="w-full movie-div md:p-10 mb-20 md:mb-0">
      <Genre />
      <Header />
      <motion.div
        layout
        className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
      >
        <AnimatePresence>
          {loader ? (
            <span className="loader m-10"></span>
          ) : (
            <>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
      <PageBtn />
    </div>
  );
}

export default Movies;
