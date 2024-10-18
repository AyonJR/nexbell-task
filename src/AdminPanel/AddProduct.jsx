import { useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack'; 

const AddProduct = () => {

  const { enqueueSnackbar } = useSnackbar();
 
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    rating: "",
    images: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = (name === "price" || name === "rating") ? Number(value) : value;

    setProduct({ ...product, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://nexbell-server.vercel.app/addProduct", product);
      if (response.data.success) {
        enqueueSnackbar("product added successfully!", { variant: 'success' });
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen custom-font">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Category:</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Rating:</label>
            <input
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Images (URL):</label>
            <input
              type="text"
              name="images"
              value={product.images}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md font-semibold  transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
