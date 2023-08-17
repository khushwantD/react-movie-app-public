import { useContext } from "react";
import ContextPage from "../ContextPage";
import Button from "../assets/Button";


 const PageBtn = () => {
  const { setPage, page } = useContext(ContextPage);

  return (
    <>
      <div className="btnpanel flex justify-center items-center">
        <a href="#" onClick={() => setPage(page - 1)}>
          <Button item="Back" />
        </a>
        <div className="px-4 py-2 bg-slate-700  text-white font-semibold rounded-full">
          {page}
        </div>
        <a href="#" onClick={() => setPage(page + 1)}>
          <Button item="Next" />
        </a>
      </div>
    </>
  );
};

export default PageBtn
