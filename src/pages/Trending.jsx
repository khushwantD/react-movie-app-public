import  { useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import MovieCard from "../components/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import PageBtn from "../components/PageBtn";
import { Helmet } from "react-helmet";

function Trending() {
  const { loader, page, fetchTrending, trending } = useContext(ContextPage);

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <>
      <Helmet>
        <title>React Movie App | Trending</title>
      </Helmet>

      <div className="w-full bg-[] md:p-10 mb-20 md:mb-0">
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
                {trending.map((trend) => (
                  <MovieCard key={trend.id} movie={trend} />
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

export default Trending;
