import { getSurpriseMeal } from "../../apis/recipe-api";

export const Header = () => {
  const { data, error, isLoading } = getSurpriseMeal();
  return (
    <header>
      <h3>Recommended Menu:</h3>
      {error && <h3>Error: {error.message}</h3>}
      {isLoading && <h3>Loading...</h3>}
      {data && (
        <>
          <h1>{data?.strMeal}</h1>
          <img src={data?.strMealThumb} alt={data?.strMeal} width="200" />
        </>
      )}
    </header>
  );
};
