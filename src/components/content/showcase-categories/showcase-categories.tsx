import { useGetMealCategories } from "../../../apis/recipe-api";

export const ShowcaseCategories = () => {
  const { data, error, isLoading } = useGetMealCategories();
  return (
    <section className="py-50">
      <h3 className="text-5xl text-center mb-50">Culinary Categories</h3>
      <div>
        {error && <h3>Error: {error.message}</h3>}
        {isLoading && <h3>Loading...</h3>}
        {data && (
          <div className="flex flex-wrap justify-center gap-4">
            {data
              .sort((a, b) =>
                a.strCategory === "Miscellaneous"
                  ? 1
                  : b.strCategory === "Miscellaneous"
                    ? -1
                    : 0,
              )
              .map((category) => (
                <div key={category.idCategory} className="px-20">
                  <div className="px-5 flex flex-col w-[20vw]">
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="mx-auto mb-5"
                    />
                    <h3 className="text-3xl text-center mb-2">
                      {category.strCategory}
                    </h3>
                    <p className="">{category.strCategoryDescription}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};
