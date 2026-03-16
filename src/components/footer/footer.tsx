export const Footer = () => {
  return (
    <footer className="h-16 bg-[#181A1B] flex flex-col justify-center">
      <h3 className="text-center">
        Project{" "}
        <a
          href="https://github.com/iceyisaak/mealmaker"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          MealMaker
        </a>{" "}
        by{" "}
        <a
          href="https://github.com/iceyisaak/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="underline">Iceyisaak</span>
        </a>
      </h3>
    </footer>
  );
};
