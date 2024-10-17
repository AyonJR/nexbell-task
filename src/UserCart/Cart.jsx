import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

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
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Rating</th>
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
