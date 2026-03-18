import { DiscoverRecipes } from "../../components/discover-recipes";
import { Header } from "../../components/header";
import { RecommendedMenu } from "../../components/recommended-menu";

export const Home = () => {
  return (
    <>
      <Header />
      <RecommendedMenu />
      <DiscoverRecipes />
    </>
  );
};
