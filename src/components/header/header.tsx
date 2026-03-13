import { getRecommendedMenu } from "../../apis/recipe-api";
import { SearchBar } from "../navbar/search-bar";
import { VscRobot } from "react-icons/vsc";

export const Header = () => {
  const { data, error, isLoading } = getRecommendedMenu();
  return (
    <header>
      <aside className="w-full h-[60rem] bg-blue-200 flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-10">Search Our Recommended Recipes</h1>
        <SearchBar />
        <p className="mt-8 mb-4">or Chat with Our</p>
        <button className="h-14 bg-amber-600 w-[16vw] cursor-pointer flex items-center justify-center gap-2 text-xl font-bold">
          <VscRobot /> CHEFBOT
        </button>
      </aside>
      <section className="py-50 px-[5vw]">
        <h3 className="text-5xl mb-14 text-center">Recommended Menu</h3>
        {error && <h3>Error: {error.message}</h3>}
        {isLoading && <h3>Loading...</h3>}
        {data && (
          <div className="flex justify-center flex-col">
            <img
              src={data?.strMealThumb}
              alt={data?.strMeal}
              className="mx-auto mb-5"
            />
            <h3 className="text-2xl text-center">{data?.strMeal}</h3>
          </div>
        )}
      </section>
    </header>
  );
};
