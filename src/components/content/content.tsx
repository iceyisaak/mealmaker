import { ShowcaseCategories } from "./showcase-categories";
import { ShowcaseIngredients } from "./showcase-ingredients";
import { ShowcaseRegions } from "./showcase-regions";

export const Content = () => {
  return (
    <section>
      <ShowcaseCategories />
      <ShowcaseIngredients />
      <ShowcaseRegions />
    </section>
  );
};
