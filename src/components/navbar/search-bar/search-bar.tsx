// src/components/navbar/search-bar.tsx
import { useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SearchRecommendationMenu } from "./search-recommendation-menu";
import { type Meal } from "../../../types";

interface SearchBarProps {
  defaultValue?: string;
}

export const SearchBar = ({ defaultValue = "" }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [inputFocus, setInputFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    inputBlurHandler();
    if (!value.trim()) return;
    navigate({
      to: "/search",
      search: { q: value.trim() },
    });
  };

  const inputFocusHandler = () => {
    setInputFocus(true);
  };

  const inputBlurHandler = () => {
    inputRef.current?.blur();
    setInputFocus(false);
    setActiveIndex(-1);
  };

  const activeIndexHandler = (index: number) => {
    setActiveIndex(index);
  };

  const handleSelect = (meal: Meal) => {
    setValue(meal.strMeal);
    inputBlurHandler();
    navigate({ to: `/meal/${meal.idMeal}` });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex gap-2 w-full max-w-xl"
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        placeholder="Search recipes..."
        className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-l-md focus:outline-none focus:border-amber-500 bg-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-amber-600 text-white font-bold text-lg rounded-r-md hover:bg-amber-700 transition-colors"
      >
        Search
      </button>

      <SearchRecommendationMenu
        query={value}
        isVisible={value !== "" && inputFocus}
        onSelect={handleSelect}
        onClose={inputBlurHandler}
        activeIndex={activeIndex}
        setActiveIndex={activeIndexHandler}
      />
    </form>
  );
};
