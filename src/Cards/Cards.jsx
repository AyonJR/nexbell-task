import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useSnackbar } from "notistack";

const Cards = ({
  filteredCards,
  handleSearch,
  handlePriceSort,
  searchQuery,
  priceRange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  console.log(user);

  const handleAddToCart = async (product) => {
    // Check if the user is authenticated
    if (!user) {
      // Notify the user to log in before adding items to the cart
      enqueueSnackbar("Please log in to add items to your cart.", { variant: "warning" });
      return; // Prevent further execution if no user is logged in
    }
  
    const cartItem = {
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      id: product._id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      images: product.images,
    };
  
    try {
      const response = await fetch("https://nexbell-server.vercel.app/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
  
      const data = await response.json();
      if (data.success) {
        enqueueSnackbar("Added to Cart successfully!", { variant: "success" });
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  // Get the current cards to display (
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
      <div className="w-full">
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
                  src={card.images}
                  alt={card.title}
                  className="w-full h-[150px] object-cover mb-4 rounded-md"
                />
                <h2 className="text-lg font-bold text-center mb-2">
                  {card.title}
                </h2>
                <p className="text-md font-semibold text-gray-700">
                  {/* Check if price is a number before using toFixed */}$
                  {typeof card.price === "number"
                    ? card.price.toFixed(2)
                    : "N/A"}
                </p>

                <p className="text-sm text-gray-500">
                  Rating: {card.rating} ⭐
                </p>
                <button
                  onClick={() => handleAddToCart(card)}
                  className="group mt-1 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add to Cart
                  </span>
                  <div className="hidden group-hover:block">
                    <div className="group absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2"></div>
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
