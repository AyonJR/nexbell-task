import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://nexbell-server.vercel.app/products");
        setProducts(response.data); 
        console.log(response.data);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleUpdateClick = (id) => {
    navigate(`/product-form/${id}`); 
  };

  return (
    <div className="overflow-x-auto custom-font mt-4 mb-44">
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product List</h2>
      </div>
    <div className="overflow-x-auto">
    <table className="min-w-full overflow-x-auto bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Rating</th>
            <th className="py-2 px-4 border-b">Images</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.title}</td>

              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.rating}</td>
              <td className="py-2 px-4 border-b">
                <img src={product.images} alt={product.title} className="w-20 h-20 object-cover" />
              </td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleUpdateClick(product._id)} 
                  className="bg-purple-500 font-semibold text-white py-1 px-3 rounded transition duration-300"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UpdateProduct;
