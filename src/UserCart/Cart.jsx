import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/cart?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCartItems(data);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [user]);

  // Handle delete cart item
  const handleDelete = (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Send DELETE request to the server
        fetch(`http://localhost:5000/cart/${itemId}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // Update the cart items state
              setCartItems(cartItems.filter((item) => item.id !== itemId));

              // Show success message
              Swal.fire(
                'Deleted!',
                'Your cart item has been deleted.',
                'success'
              );
            } else {
              // Show error message
              Swal.fire(
                'Error!',
                'Failed to delete the item. Please try again.',
                'error'
              );
            }
          })
          .catch((error) => {
            console.error('Error deleting cart item:', error);
            Swal.fire(
              'Error!',
              'Something went wrong. Please try again later.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 custom-font">
      {/* Display User Information */}
      <div className="user-info mb-8">
        <h2 className="text-4xl font-bold text-center mb-6">My Cart</h2>
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-32"></div>
          <div className="relative flex justify-center -mt-16">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="text-center mt-6">
            <p className="text-2xl font-semibold text-gray-800">
              {user?.displayName}
            </p>
            <p className="text-gray-600 mt-2">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Display Cart Items */}
      {cartItems.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-x-scroll">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-4 border-b">
                  <img
                    src={item.images}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4 border-b">{item.title}</td>
                <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{item.rating} ⭐</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="group relative flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                  >
                    <svg
                      viewBox="0 0 1.625 1.625"
                      className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-spin duration-1000"
                      height="15"
                      width="15"
                    >
                      <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                      <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                      <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                    </svg>
                    <svg
                      width="16"
                      fill="none"
                      viewBox="0 0 39 7"
                      className="origin-right duration-500 group-hover:rotate-90"
                    >
                      <line
                        strokeWidth="4"
                        stroke="white"
                        y2="5"
                        x2="39"
                        y1="5"
                      ></line>
                      <line
                        strokeWidth="3"
                        stroke="white"
                        y2="1.5"
                        x2="26.0357"
                        y1="1.5"
                        x1="12"
                      ></line>
                    </svg>
                    <svg width="16" fill="none" viewBox="0 0 33 39">
                      <mask fill="white" id="path-1-inside-1_8_19">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                      </mask>
                      <path
                        mask="url(#path-1-inside-1_8_19)"
                        fill="white"
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                      ></path>
                      <path
                        strokeWidth="4"
                        stroke="white"
                        d="M12 6L12 29"
                      ></path>
                      <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default Cart;
