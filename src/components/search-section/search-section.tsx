import { SearchBar } from "../navbar/search-bar";
import { VscRobot } from "react-icons/vsc";

const SearchSection = () => {
  return (
    <aside className="w-full h-[60rem] bg-blue-200 flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-10">Search Our Recommended Recipes</h1>
      <SearchBar />
      <p className="mt-8 mb-4">or Chat with Our</p>
      <button className="h-14 bg-amber-600 w-[16vw] cursor-pointer flex items-center justify-center gap-2 text-xl font-bold">
        <VscRobot /> CHEFBOT
      </button>
    </aside>
  );
};
export default SearchSection;
