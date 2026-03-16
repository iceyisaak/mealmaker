import { Link } from "@tanstack/react-router";
import Logo from "../../assets/mealmaker-logo.svg?react";

export const Navbar = () => {
  return (
    <nav className="w-full bg-[#181A1B] py-3 font-barlow border-b border-amber-brand/10">
      <Link className="flex w-fit items-center" to={"/"}>
        <Logo className="ml-3 mr-2 h-8 w-8 text-amber-brand" />
        <span className="font-playfair text-2xl font-bold tracking-tight text-stone-cream">
          Meal<em className="italic text-amber-brand">Maker</em>
        </span>
      </Link>
    </nav>
  );
};
