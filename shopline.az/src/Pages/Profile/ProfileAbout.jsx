import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileAbout() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    profileImage: "",
    phone: "",
  });

  const [basket, setBasket] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user"))?.id || 1;

  useEffect(() => {
    fetch(`http://localhost:5005/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Xəta baş verdi");
        return res.json();
      })
      .then((data) => {
        setUser({
          fullName: data.fullName || "",
          email: data.email || "",
          password: data.password || "",
          profileImage: data.profileImage || "",
          phone: data.phone || "",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("İstifadəçi məlumatlarını yükləmək mümkün olmadı");
      });

    const basketStr = localStorage.getItem("basket");
    if (basketStr) {
      setBasket(JSON.parse(basketStr));
    }
  }, [userId]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSave = () => {
    fetch(`http://localhost:5005/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Xəta baş verdi");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Profil məlumatları uğurla yeniləndi");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Profil məlumatları yenilənmədi");
      });
  };

  const increaseCount = (id) => {
    let updatedBasket = basket.map((item) => {
      if (item.id === id) {
        if (item.count < item.stock) {
          return { ...item, count: item.count + 1 };
        } else {
          toast.error(`Maksimum stok miqdarı: ${item.stock}`);
        }
      }
      return item;
    });
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  };

  const decreaseCount = (id) => {
    let updatedBasket = basket.map((item) => {
      if (item.id === id) {
        if (item.count > 1) {
          return { ...item, count: item.count - 1 };
        } else {
          toast.error("Say 1-dən aşağı düşə bilməz");
        }
      }
      return item;
    });
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  };

  const removeItem = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    toast.info("Məhsul səbətdən silindi");
  };

  const totalPrice = basket.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const completeOrder = () => {
    if (basket.length === 0) {
      toast.error("Səbət boşdur, sifariş edə bilməzsiniz.");
      return;
    }

    const orderData = {
      userId,
      fullName: user.fullName,
      phone: user.email || "Yoxdur",
      items: basket.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.count,
        price: item.price,
        total: item.price * item.count,
      })),
      totalPrice,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:5005/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Sifariş əlavə edilə bilmədi");
        return res.json();
      })
      .then(() => {
        toast.success("Sifarişiniz uğurla tamamlandı");
        localStorage.removeItem("basket");
        setBasket([]);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Sifariş göndərilmədi");
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profilim</h1>

      <div className="mb-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Şəxsi məlumatlar</h2>

        <div className="flex items-center gap-6 mb-6">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profil şəkli"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xl text-gray-600 border">
              Foto
            </div>
          )}

          <input
            type="text"
            name="profileImage"
            placeholder="Profil şəkli URL"
            value={user.profileImage}
            onChange={handleUserChange}
            className="flex-1 border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <input
            type="text"
            name="fullName"
            placeholder="Adınız"
            value={user.fullName}
            onChange={handleUserChange}
            className="border rounded px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleUserChange}
            className="border rounded px-3 py-2"
          />
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Telefon nömrəsi"
          value={user.phone}
          onChange={handleUserChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Şifrə"
          value={user.password}
          onChange={handleUserChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        <button
          onClick={handleUserSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Məlumatları Yenilə
        </button>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Səbətim</h2>

        {basket.length === 0 ? (
          <p className="text-gray-600">Səbət boşdur.</p>
        ) : (
          <div>
            {basket.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>Qiymət: ${item.price}</p>
                    <p>Stok: {item.stock}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseCount(item.id)}
                    className="bg-red-500 text-white px-3 rounded hover:bg-red-600 transition"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.count}</span>
                  <button
                    onClick={() => increaseCount(item.id)}
                    className="bg-green-500 text-white px-3 rounded hover:bg-green-600 transition"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-red-600 hover:text-red-800 font-semibold"
                  >
                    Sil
                  </button>
                </div>

                <div className="font-semibold text-right md:text-left">
                  ${(item.price * item.count).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="text-right mt-4 text-xl font-bold">
              Ümumi: ${totalPrice.toFixed(2)}
            </div>

            <button
              onClick={completeOrder}
              className="bg-green-600 text-white px-6 py-2 rounded mt-6 hover:bg-green-700 transition"
            >
              Sifarişi Tamamla
            </button>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default ProfileAbout;
