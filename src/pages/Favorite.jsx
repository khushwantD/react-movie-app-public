import { useEffect, useContext, useState } from "react";
import Header from "../components/Header";
import ContextPage from "../ContextPage";
import MovieCard from "../components/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

function FavoritePage() {
  const { loader, GetFavorite } = useContext(ContextPage);
  const [localStorageData, setLocalStorageData] = useState([]);

  useEffect(() => {
    GetFavorite();

    const data = localStorage;
    setLocalStorageData(data);
  }, []);

  return (
    <>
      <Helmet>
        <title>React Movies App | Favorite Movies</title>
      </Helmet>

      <div className="w-full md:p-10 mb-20 md:mb-0">
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
                {Object.keys(localStorageData).filter((key) => !isNaN(key))
                  .length == 0 ? (
                  <p className="text-xl text-gray-400">No Bookmark Yet!</p>
                ) : (
                  Object.keys(localStorageData)
                    .filter((key) => !isNaN(key))
                    .map((key, index) => (
                      <MovieCard
                        key={index}
                        movie={{ ...JSON.parse(localStorageData[key]) }}
                      />
                    ))
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default FavoritePage;
