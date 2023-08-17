import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import ContextPage from "../ContextPage";


function SearchBar() {
  const { filteredGenre, fetchSearch, setBackGenre, setGenres } =
    useContext(ContextPage);
  const [value, setValue] = useState("");

  const searchMovie = () => {
    
      const query = value.trim();

      if (query === "") {
        filteredGenre();
      } else {
        fetchSearch(query);
        setGenres([]);
        setBackGenre(true);
      }
      setValue("");
    
  };

  return (
    <>
      <Helmet>
        <title>BlueBird Movies</title>
      </Helmet>

      <div className="w-full search-div h-[10rem] md:h-[12rem]">
        <div className="h-full w-full bg-black/30 flex justify-center items-center">
          <input
            type="search"
            name="searchpanel"
            id="searchpanel"
            placeholder="Search movie"
            className="p-3 w-full mx-10 md:w-[40rem]  rounded-xl outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className=" w-40 text-gray-900 p-2 mr-1 text-xs sm:p-3 sm:text-sm text-bold rounded-xl search-btn" onClick={searchMovie}>Give Me This !</button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
