import { Link } from "@tanstack/react-router";
import { useGetRecommendedMenu } from "../../apis/recipe-api";
import SearchSection from "../search-section/search-section";

export const Header = () => {
  const { data, error, isLoading } = useGetRecommendedMenu();
  return (
    <header className="bg-[#181A1B]">
      <SearchSection />
      <section className="py-50 px-[5vw]">
        <h3 className="text-5xl mb-14 text-center">Recommended Menu</h3>
        {error && <h3>Error: {error.message}</h3>}
        {isLoading && <h3>Loading...</h3>}
        {data && (
          <div className="flex justify-center flex-col">
            <Link to="/meal/$id" params={{ id: data.idMeal }}>
              <img
                src={data?.strMealThumb}
                alt={data?.strMeal}
                className="mx-auto mb-5"
              />
            </Link>
            <h3 className="text-2xl text-center">{data?.strMeal}</h3>
          </div>
        )}
      </section>
    </header>
  );
};
