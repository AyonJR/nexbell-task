import React, { useEffect, useState } from "react";
import Functionalities from "../Functionalities/Functionalities";
import Cards from "../Cards/Cards";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.products);
        setFilteredCards(data.products); // Initialize with all products
      });
  }, []);

  // Function to apply filtering from Functionalities component
  const applyAdditionalFilter = (filter) => {
    let filtered = cards;

    // Apply filtering logic based on the filter passed
    if (filter.category) {
      filtered = filtered.filter((card) => card.category === filter.category);
    }

    if (filter.rating) {
      filtered = filtered.filter((card) => card.rating >= filter.rating);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    if (priceRange === "below50") {
      filtered = filtered.filter((card) => card.price < 50);
    } else if (priceRange === "50to100") {
      filtered = filtered.filter((card) => card.price >= 50 && card.price <= 100);
    } else if (priceRange === "above100") {
      filtered = filtered.filter((card) => card.price > 100);
    }

    setFilteredCards(filtered);
  };

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyAdditionalFilter({}); // Reapply filters with updated search query
  };

  // Handle price range selection
  const handlePriceSort = (e) => {
    const range = e.target.value;
    setPriceRange(range);
    applyAdditionalFilter({}); // Reapply filters with updated price range
  };

  return (
    <div>
      <div className="flex w-full px-6 mt-10 gap-5">
        {/* filter and sorting  */}
        <div className="w-1/5">
          <Functionalities applyFilter={applyAdditionalFilter} />
        </div>

        {/* product cards */}
        <div className="w-4/5">
          <Cards 
            filteredCards={filteredCards}
            handleSearch={handleSearch}
            handlePriceSort={handlePriceSort}
            searchQuery={searchQuery}
            priceRange={priceRange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
