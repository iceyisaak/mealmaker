import { getRecommendedMenu } from "../../apis/recipe-api";
import { SearchBar } from "../navbar/search-bar";
import { VscRobot } from "react-icons/vsc";

export const Header = () => {
  const { data, error, isLoading } = getRecommendedMenu();
  return (
    <header>
      <aside className="w-full h-[50rem] bg-blue-200 flex flex-col justify-center items-center">
        <h3 className="text-5xl mb-10">Search Our Recommended Recipes</h3>
        <SearchBar />
        <p className="mt-8 mb-4">or Chat with Our</p>
        <button className="h-14 bg-amber-600 w-[16vw] cursor-pointer flex items-center justify-center gap-2 text-xl font-bold">
          <VscRobot /> CHEFBOT
        </button>
      </aside>
      <h3 className="text-3xl">Recommended Menu:</h3>
      {error && <h3>Error: {error.message}</h3>}
      {isLoading && <h3>Loading...</h3>}
      {data && (
        <>
          <h1>{data?.strMeal}</h1>
          <img src={data?.strMealThumb} alt={data?.strMeal} width="auto" />
        </>
      )}
    </header>
  );
};
