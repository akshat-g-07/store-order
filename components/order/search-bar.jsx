"use client";

import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/stores/cart";
import { Search } from "lucide-react";

import VegTypeSVG from "@/components/common/veg-type-svg";

export default function SearchBar({ inventory, isLoading }) {
  const { addItem } = useCartStore();
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(inventory);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = inventory.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm, inventory]);

  useEffect(() => {
    setFilteredSuggestions(inventory);
  }, [inventory]);

  return (
    <div
      ref={searchRef}
      className="relative w-[80vw] min-w-[200px] max-w-[450px]"
    >
      <div className="flex items-center rounded-md bg-white transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-primaryGreenHover focus-within:shadow-lg overflow-hidden border border-brand-primaryGreen">
        <button
          className="flex h-10 w-12 items-center justify-center rounded-l-md bg-brand-primaryYellow hover:bg-brand-primaryYellow/90"
          aria-label="Search"
        >
          <Search className="size-4 text-gray-800" />
        </button>
        <input
          type="text"
          className="h-10 flex-1 px-4 text-base focus:outline-none"
          placeholder="Search Menu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          disabled={isLoading}
        />
      </div>

      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full rounded-b-md bg-white shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer space-x-2"
              onClick={() => {
                addItem(suggestion.id);
                setSearchTerm("");
                setIsFocused(false);
              }}
            >
              <VegTypeSVG veg={suggestion.veg} />
              <span>{suggestion.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
