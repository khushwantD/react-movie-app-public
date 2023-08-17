import  { useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import { Helmet } from "react-helmet";

function Genre() {
  const { fetchGenre, activeGenre, setActiveGenre, genres } =
    useContext(ContextPage);

  useEffect(() => {
    fetchGenre();
  }, []);

  
  return (
    <>
      <Helmet>
        <title>React Movie App | Genres</title>
      </Helmet>

      <div className="flex flex-wrap justify-center px-2">
        {genres.map((genre) => (
          <button
            onClick={() => setActiveGenre(genre.id)}
            className={
              activeGenre === genre.id
                ? "active px-4 py-2 m-2 text-[15px] text-white font-semibold rounded-3xl"
                : "px-4 py-2 m-2 text-[15px] bg-genreBg text-[rgba(2,0,36,1)] font-semibold rounded-3xl"
            }
            key={genre.id}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default Genre;
