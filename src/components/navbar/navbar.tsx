import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import Logo from "../../assets/mealmaker-logo.svg?react";
import { useGetMealCategories, useGetMealOrigin } from "../../apis/recipe-api";
import { ChevronDown } from "lucide-react";

type DropdownKey = "categories" | "origin" | null;

const DropdownMenu = ({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-stone-300 hover:text-stone-cream hover:bg-white/5 transition-all duration-150"
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 text-amber-brand/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-[#1e2022] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const navRef = useRef<HTMLElement>(null);

  const { data: categories, isLoading: categoriesLoading } =
    useGetMealCategories();
  const { data: origins, isLoading: originsLoading } = useGetMealOrigin();

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      className="w-full bg-[#181A1B] py-3 font-barlow border-b border-amber-brand/10"
    >
      <div className="flex items-center justify-between px-3">
        {/* Logo */}
        <Link className="flex w-fit items-center" to={"/"}>
          <Logo className="mr-2 h-8 w-8 text-amber-brand" />
          <span className="font-playfair text-2xl font-bold tracking-tight text-stone-cream">
            Meal<em className="italic text-amber-brand">Maker</em>
          </span>
        </Link>

        {/* Right-side dropdowns */}
        <div className="flex items-center gap-1">
          {/* Categories */}
          <DropdownMenu
            label="Categories"
            isOpen={openDropdown === "categories"}
            onToggle={() => toggleDropdown("categories")}
          >
            {categoriesLoading ? (
              <div className="px-4 py-3 text-xs text-stone-400">Loading...</div>
            ) : (
              categories?.map((cat) => (
                <Link
                  key={cat.idCategory}
                  to="/search"
                  search={{ c: cat.strCategory }}
                  onClick={() => setOpenDropdown(null)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-300 hover:text-stone-cream hover:bg-amber-brand/10 transition-colors duration-100 group"
                >
                  <img
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    className="w-6 h-6 rounded-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span>{cat.strCategory}</span>
                </Link>
              ))
            )}
          </DropdownMenu>

          {/* Origin */}
          <DropdownMenu
            label="Origin"
            isOpen={openDropdown === "origin"}
            onToggle={() => toggleDropdown("origin")}
          >
            {originsLoading ? (
              <div className="px-4 py-3 text-xs text-stone-400">Loading...</div>
            ) : (
              origins?.map((origin) => (
                <Link
                  key={origin.strArea}
                  to="/search"
                  search={{ a: origin.strArea }}
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2.5 text-sm text-stone-300 hover:text-stone-cream hover:bg-amber-brand/10 transition-colors duration-100"
                >
                  {origin.strArea}
                </Link>
              ))
            )}
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
