import React, { useState } from "react";

const Cards = ({
  filteredCards,
  handleSearch,
  handlePriceSort,
  searchQuery,
  priceRange,
}) => {
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const cardsPerPage = 10; // Number of cards per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  // Get the current cards to display (based on current page)
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination
  const renderPaginationControls = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 border ${
            i === currentPage
              ? "bg-purple-500 text-white"
              : "bg-white text-black border-gray-300"
          } rounded-md`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-6">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-white text-black border border-gray-300 rounded-md mx-1"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pages}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-white text-black border border-gray-300 rounded-md mx-1"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Search Products */}
      <div className="flex w-full">
        <div className="w-3/4">
         <div className="relative p-[2px] rounded-md bg-gradient-to-r from-purple-500 to-pink-500">
         <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2  rounded-md"
          />
         </div>
        </div>

        {/* Price range sorting */}
        <div className="ml-4 w-1/4">
        <div className="relative p-[2px] rounded-md bg-gradient-to-r from-purple-500 to-pink-500">
  <select
    value={priceRange}
    onChange={handlePriceSort}
    className="w-full p-2 custom-font bg-white border-l-4 border-purple-500 focus:outline-none rounded-md"
  >
    <option value="all">All Prices</option>
    <option value="below50">Below $50</option>
    <option value="50to100">$50 - $100</option>
    <option value="above100">Above $100</option>
  </select>
</div>

        </div>
      </div>

      {/* Display the current cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10">
        {currentCards.length > 0 ? (
          currentCards.map((card) => (
            <div
              key={card.id}
              className="relative custom-font h-[350px] rounded-[14px] z-[1111] overflow-hidden flex flex-col items-center justify-center shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] p-4"
            >
              <div className="absolute w-[20px] h-[20px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-[8px] opacity-80 animate-border-move"></div>

              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={card.thumbnail}
                  alt={card.title}
                  className="w-full h-[150px] object-cover mb-4 rounded-md"
                />
                <h2 className="text-lg font-bold text-center mb-2">
                  {card.title}
                </h2>
                <p className="text-md font-semibold text-gray-700">
                  ${card.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Rating: {card.rating} ⭐
                </p>
                <button className="group mt-1 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add to Cart
                  </span>
                  <div className="hidden group-hover:block">
                    <div className="group absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2">
                     
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Render pagination controls */}
      {filteredCards.length > 10 && renderPaginationControls()}
    </div>
  );
};

export default Cards;
