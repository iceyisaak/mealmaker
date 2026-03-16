// src/components/navbar/search-bar.tsx
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

interface SearchBarProps {
  defaultValue?: string;
}

export const SearchBar = ({ defaultValue = "" }: SearchBarProps) => {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    navigate({
      to: "/search",
      search: { q: value.trim() },
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-xl">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search recipes..."
        className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-l-md focus:outline-none focus:border-amber-500 bg-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-amber-600 text-white font-bold text-lg rounded-r-md hover:bg-amber-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
};
