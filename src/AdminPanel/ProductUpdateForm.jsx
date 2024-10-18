import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Import useSnackbar from Notistack

const ProductUpdateForm = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    rating: "",
    images: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`); 
        setProduct(response.data); // Set the product data in the state
      } catch (err) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    console.log('Product to update:', product); 

    const form = e.target
     const title = form.title.value
     const category = form.category.value
     const price = form.price.value
     const rating = form.rating.value
     const images = form.images.value

     const updateProduct = { title , category , price , rating , images}
  
    try {
      const response = await axios.put(`http://localhost:5000/products/${id}`, updateProduct); // Update product by ID
      if (response.data.success) {
        enqueueSnackbar("Product updated successfully!", { variant: "success" }); 
        navigate("/"); // Navigate to the products page or any other page
      }
    } catch (error) {
      enqueueSnackbar("Failed to update product", { variant: "error" }); 
      console.error("Error updating product:", error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-4">
        <div className="flex justify-center">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>

        </div>
      <div className="flex justify-center">
      <form onSubmit={handleUpdate} className="bg-white lg:w-1/2 w-full p-4 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })} // Update title
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })} // Update category
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })} // Update price
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            value={product.rating}
            onChange={(e) => setProduct({ ...product, rating: e.target.value })} // Update rating
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="images">Image URL</label>
          <input
            type="text"
            id="images"
            value={product.images}
            onChange={(e) => setProduct({ ...product, images: e.target.value })} // Update images URL
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="flex justify-center">
        <button 
          type="submit"
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
        >
          Update Product
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;
