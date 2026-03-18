import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import Logo from "../../assets/mealmaker-logo.svg?react";
import {
  ChevronDown,
  Bot,
  Bookmark,
  UtensilsCrossed,
  Globe,
  Leaf,
} from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exploreLinks = [
    {
      to: "/category",
      search: { mode: "categories" },
      icon: UtensilsCrossed,
      label: "By Culinary Category",
    },
    {
      to: "/origin",
      search: { mode: "origin" },
      icon: Globe,
      label: "By Culinary Origin",
    },
    {
      to: "/ingredient",
      search: { mode: "ingredients" },
      icon: Leaf,
      label: "By Ingredients",
    },
  ];

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

        {/* Right-side actions */}
        <div className="flex items-center gap-1">
          {/* Explore Recipes Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-stone-300 hover:text-stone-cream hover:bg-white/5 transition-all duration-150"
            >
              Explore Recipes
              <ChevronDown
                className={`w-3.5 h-3.5 text-amber-brand/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1e2022] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 py-1.5">
                {exploreLinks.map(({ to, icon: Icon, label }) => (
                  <Link
                    key={label}
                    to={to}
                    // search={search}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-300 hover:text-stone-cream hover:bg-amber-brand/10 transition-colors duration-100 group"
                  >
                    <Icon className="w-4 h-4 text-amber-brand/50 group-hover:text-amber-brand/80 transition-colors shrink-0" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Ask Chefbot */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-stone-300 hover:text-stone-cream hover:bg-white/5 transition-all duration-150"
          >
            <Bot className="w-4 h-4 text-amber-brand/70" />
            Ask Chefbot
          </Link>

          {/* My Bookmarked Recipes */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-stone-300 hover:text-stone-cream hover:bg-white/5 transition-all duration-150"
          >
            <Bookmark className="w-4 h-4 text-amber-brand/70" />
            My Bookmarked Recipes
          </Link>
        </div>
      </div>
    </nav>
  );
};
