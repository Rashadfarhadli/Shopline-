import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductList() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5005/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToBasket = (product) => {
    toast.dismiss();

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      toast.error("Zəhmət olmasa səbətə əlavə etmək üçün daxil olun.");
      return;
    }

    const basketStr = localStorage.getItem("basket");
    const basket = basketStr ? JSON.parse(basketStr) : [];

    const existingIndex = basket.findIndex(item => item.id === product.id);
    if (existingIndex >= 0) {
      const newCount = basket[existingIndex].count + 1;
      if (newCount > product.stock) {
        toast.error("Stokdan artıq məhsul əlavə etmək olmaz.");
        return;
      }
      basket[existingIndex].count = newCount;
    } else {
      basket.push({
        id: product.id,
        name: product.ProductName,
        price: product.Price,
        count: 1,
        imageUrl: product.ImageUrl,
      });
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    toast.success(`"${product.ProductName}" səbətə əlavə edildi.`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-3 ">
        Our Products
      </h2>
      <h2 className="text-xl text-gray-900 mb-15 ">
        Discover our wide range of quality products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 relative flex flex-col"
          >
           
            <img 
              src={product.ImageUrl} 
              alt={product.ProductName} 
              className="rounded-t-3xl w-full h-56 object-cover"
              loading="lazy"
            />

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.ProductName}
              </h3>
              <p className="text-gray-600 flex-grow">{product.Description}</p>

              <div className="mt-4">
                <p className="text-lg font-bold text-green-600 mb-1">
                  ${product.Price}
                </p>
                <p className="text-yellow-500 font-medium mb-2">
                  ⭐ {product.Rating} / 5
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Stock: {product.stock} ədəd
                </p>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleAddToBasket(product)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
                  >
                    Add to Basket
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl font-semibold text-center hover:bg-indigo-700 transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="colored"
      />
    </div>
  );
}

export default ProductList;
