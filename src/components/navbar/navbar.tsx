import { Link } from "@tanstack/react-router";
import Logo from "../../assets/mealmaker-logo.svg?react";

export const Navbar = () => {
  return (
    <nav className="w-full bg-amber-600 py-3">
      <Link className="flex w-fit" to={"/"}>
        <Logo className={`w-8 h-8 text-amber-400 ml-3 mr-1`} />
        <span className="text-2xl text-gray-100">MealMaker</span>
      </Link>
    </nav>
  );
};
