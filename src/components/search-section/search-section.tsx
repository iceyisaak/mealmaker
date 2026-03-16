import { SearchBar } from "../navbar/search-bar";
import { VscRobot } from "react-icons/vsc";
import coverVdo from "../../assets/cover-vdo.mp4";

const SearchSection = () => {
  return (
    <aside className="relative w-full h-[60rem] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={coverVdo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center">
        <h1 className="text-5xl mb-10 text-white">
          Search Our Recommended Recipes
        </h1>
        <SearchBar />
        <p className="mt-8 mb-4 text-white">or Chat with Our</p>
        <button className="h-14 bg-amber-600 w-[16vw] cursor-pointer flex items-center justify-center gap-2 text-xl font-bold text-white">
          <VscRobot /> CHEFBOT
        </button>
      </div>
    </aside>
  );
};

export default SearchSection;
