import  { useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import MovieCard from "../components/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import  PageBtn  from "../components/PageBtn";
import { Helmet } from "react-helmet";

function Upcoming() {
  const { loader, page, fetchUpcoming, upcoming } =
    useContext(ContextPage);

  useEffect(() => {
    fetchUpcoming();
  }, [page]);

  return (
    <>
      <Helmet>
        <title>React Movies App | Upcoming movies</title>
      </Helmet>

      <div className="w-full movie-div md:p-10 mb-20 md:mb-0">
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
                {upcoming.map((upc) => (
                  <MovieCard key={upc.id} movie={upc} />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
        <PageBtn />
      </div>
    </>
  );
}

export default Upcoming;
