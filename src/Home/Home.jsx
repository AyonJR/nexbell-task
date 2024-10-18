import React, { useEffect, useState } from "react";
import Functionalities from "../Functionalities/Functionalities";
import Cards from "../Cards/Cards";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    rating: 0,
    priceRange: [0, Infinity], // New price range filter
  });

  useEffect(() => {
    // Fetch products from API
    fetch("https://nexbell-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setFilteredCards(data); // Initialize with all products
      });
  }, []);

  // Function to apply filters
  const applyFilter = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
  };

  useEffect(() => {
    // Filtering logic based on category, rating, price range, and search query
    let filtered = cards;

    // Category Filter
    if (filters.category) {
      filtered = filtered.filter((card) =>
        card.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Rating Filter
    if (filters.rating > 0) {
      filtered = filtered.filter((card) => card.rating >= filters.rating);
    }

    // Price Filter
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== Infinity) {
      filtered = filtered.filter(
        (card) => card.price >= filters.priceRange[0] && card.price <= filters.priceRange[1]
      );
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCards(filtered);
  }, [filters, searchQuery, cards]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Trigger re-filtering via useEffect
  };

  return (
    <div>
      <div className="flex lg:flex-row flex-col w-full px-6 mt-10 gap-5">
        {/* Filter and sorting */}
        <div className="lg:w-1/5 w-full">
          <Functionalities applyFilter={applyFilter} />
        </div>

        {/* Product cards */}
        <div className="lg:w-4/5 w-full">
          <Cards
            filteredCards={filteredCards}
            handleSearch={handleSearch}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
