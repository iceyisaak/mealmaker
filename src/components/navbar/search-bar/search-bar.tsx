export const SearchBar = () => {
  return (
    <section>
      <input
        type="text"
        name="search bar"
        placeholder="e.g. Steak"
        className="bg-gray-100 w-[30vw] h-10 px-3"
      />
      <button className="ml-3 bg-blue-600 h-10 w-30">Search</button>
    </section>
  );
};
