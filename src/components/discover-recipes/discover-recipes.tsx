export const DiscoverRecipes = () => {
  return (
    <section className="my-[20rem]">
      <h1 className="text-4xl text-center mb-20">Explore Recipes</h1>
      <div className="flex">
        <aside className="h-[20vh] w-1/3 mx-10 bg-red-400 flex items-center justify-center">
          <h3 className="text-center ">By Culinary Category</h3>
        </aside>
        <aside className="h-[20vh] w-1/3 mx-10 bg-green-400 flex items-center justify-center">
          <h3 className="text-center ">By Culinary Origin</h3>
        </aside>
        <aside className="h-[20vh] w-1/3 mx-10 bg-blue-400 flex items-center justify-center">
          <h3 className="text-center ">By Ingredients</h3>
        </aside>
      </div>
    </section>
  );
};
export default DiscoverRecipes;
