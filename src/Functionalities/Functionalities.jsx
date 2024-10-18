import React from "react";

const Functionalities = ({ applyFilter }) => {
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    applyFilter({ category: selectedCategory });
  };

  const handleRatingChange = (e) => {
    const selectedRating = parseFloat(e.target.value);
    applyFilter({ rating: selectedRating });
  };

  const handlePriceChange = (e) => {
    const selectedPriceRange = e.target.value.split("-").map(Number);
    applyFilter({ priceRange: selectedPriceRange });
  };

  return (
    <div className="custom-font">
      <div className="flex justify-center mb-4 relative p-[2px] rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="w-full h-full bg-white flex justify-center items-center rounded-2xl">
          <h2 className="text-xl sm:text-2xl py-1 custom-font font-bold">Filter</h2>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block mb-2">Category:</label>
        <div className="relative p-[2px] rounded-md bg-gradient-to-r from-purple-500 to-pink-500">
          <select
            onChange={handleCategoryChange}
            className="w-full p-2 border border-l-4 border-purple-500 rounded-md"
          >
            <option value="">All Categories</option>
            <option value="furniture">furniture</option>
            <option value="beauty">beauty</option>
            <option value="fragrances">fragrances</option>
            <option value="groceries">groceries</option>
          </select>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label className="block mb-2">Minimum Rating:</label>
        <div className="relative p-[2px] rounded-md bg-gradient-to-r from-purple-500 to-pink-500">
          <select
            onChange={handleRatingChange}
            className="w-full p-2 border-l-4 border-purple-500 rounded-md"
          >
            <option value="0">All Ratings</option>
            <option value="3">3 ⭐ and above</option>
            <option value="4">4 ⭐ and above</option>
            <option value="5">5 ⭐ only</option>
          </select>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="block mb-2">Price Range:</label>
        <div className="relative p-[2px] rounded-md bg-gradient-to-r from-purple-500 to-pink-500">
          <select
            onChange={handlePriceChange}
            className="w-full p-2 border-l-4 border-purple-500 rounded-md"
          >
            <option value="0-Infinity">All Prices</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-Infinity">Above $500</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Functionalities;
