export const Footer = () => {
  return (
    <footer className="flex h-16 flex-col justify-center bg-[#181A1B] font-barlow border-t border-amber-brand/10">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.25em] text-stone-faint">
        Project{" "}
        <a
          href="https://github.com/iceyisaak/mealmaker"
          target="_blank"
          rel="noreferrer"
          className="text-amber-brand transition-colors hover:text-amber-light"
        >
          MealMaker
        </a>{" "}
        by{" "}
        <a
          href="https://github.com/iceyisaak/"
          target="_blank"
          rel="noreferrer"
          className="text-amber-brand transition-colors hover:text-amber-light"
        >
          Iceyisaak
        </a>
      </p>
    </footer>
  );
};
