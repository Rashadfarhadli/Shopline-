import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setError(null);
    fetch(`http://localhost:5005/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Məhsul tapılmadı (status: ${res.status})`);
        return res.json();
      })
      .then((data) => {
       
        console.log("Məhsul məlumatı:", data);

        setProduct(data);
        setCount(1);

      
        const stockValue = data.stock ?? data.Stock ?? 0;
        localStorage.setItem("productStock", String(stockValue));
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        Xəta: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Məhsul yüklənir...
      </div>
    );
  }


  const maxCount = product.stock ?? product.Stock ?? 0;
  const minCount = 1;
  const totalPrice = (product.Price * count).toFixed(2);

  const increment = () => {
    if (count < maxCount) {
      setCount((prev) => prev + 1);
      toast.dismiss();
    } else {
      toast.error("Maksimum stok sayına çatdınız");
    }
  };

  const decrement = () => {
    if (count > minCount) {
      setCount((prev) => prev - 1);
      toast.dismiss();
    }
  };

  const addToBasket = () => {
    toast.dismiss();

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      toast.error("Zəhmət olmasa səbətə əlavə etmək üçün hesabınıza daxil olun.");
      return;
    }

    if (count > maxCount) {
      toast.error(`Maksimum stok sayı ${maxCount} ədəddir.`);
      return;
    }

    const basketStr = localStorage.getItem("basket");
    const basket = basketStr ? JSON.parse(basketStr) : [];

    const productIndex = basket.findIndex((item) => item.id === product.id);

    if (productIndex >= 0) {
      const newCount = basket[productIndex].count + count;
      if (newCount > maxCount) {
        toast.error("Səbətdə maksimum stokdan artıq məhsul ola bilməz.");
        return;
      }
      basket[productIndex].count = newCount;
      basket[productIndex].stock = maxCount; 
    } else {
      basket.push({
        id: product.id,
        name: product.ProductName,
        price: product.Price,
        count: count,
        imageUrl: product.ImageUrl,
        stock: maxCount,
      });
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    toast.success(`${count} ədəd "${product.ProductName}" səbətə əlavə edildi. (Stok: ${maxCount} ədəd)`);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg mt-10">
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={product.ImageUrl}
            alt={product.ProductName}
            className="w-full md:w-1/2 h-[300px] object-cover rounded-xl"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-indigo-800">{product.ProductName}</h1>
            <p className="text-gray-700">{product.Description}</p>
            <p className="text-lg text-green-600 font-bold">${product.Price}</p>
            <p className="text-gray-700">Stock: {maxCount}</p>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={decrement}
                disabled={count <= minCount}
                className={`px-3 py-1 rounded transition ${
                  count <= minCount
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                aria-label="Azalt"
              >
                -
              </button>
              <span className="text-xl font-semibold">{count}</span>
              <button
                onClick={increment}
                disabled={count >= maxCount}
                className={`px-3 py-1 rounded transition ${
                  count >= maxCount
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                aria-label="Artır"
              >
                +
              </button>
            </div>

            <p className="text-xl font-bold mt-2">
              Ümumi: <span className="text-green-700">${totalPrice}</span>
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={addToBasket}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
              >
                Add to Basket
              </button>
              <Link
                to="/products"
                className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded hover:bg-indigo-100 transition"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Product Information</h2>
          <ul className="space-y-2 text-gray-800">
            <li><strong>Name:</strong> {product.ProductName}</li>
            <li><strong>Stock:</strong> {maxCount} ədəd</li>
            <li><strong>Category:</strong> {product.composition || "N/A"}</li>
            <li><strong>Rating:</strong> {product.Rating} / 5</li>
          </ul>
        </div>
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
    </>
  );
}

export default ProductDetail;
