import { useContext } from "react";
import ContextPage from "../ContextPage";
import { HiChevronLeft } from "react-icons/hi";

function Header() {
  const { header, backGenre } = useContext(ContextPage);

  return (
    <>
      <header
        className={`flex  items-center ${
          backGenre
            ? "justify-center gap-10 md:justify-between"
            : "justify-center"
        } text-3xl md:text-4xl font-bold text-white py-3 px-5 md:px-10`}
      >
        {backGenre ? (
          <a
            href="/"
            className="bg-gray-600 text-white p-2 rounded-full text-xl md:text-2xl"
          >
            <HiChevronLeft />
          </a>
        ) : null}

        {header}
      </header>
    </>
  );
}

export default Header;
