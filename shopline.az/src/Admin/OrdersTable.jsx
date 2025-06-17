import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5005/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sifarişlər alınmadı:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sifarişlər</h2>
      {loading ? (
        <p>Yüklənir...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm uppercase">
                <th className="px-4 py-3">Ad Soyad</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Məhsullar</th>
                <th className="px-4 py-3">Ümumi Qiymət</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const totalPrice = order.items.reduce((sum, item) => sum + item.total, 0);
                return (
                  <tr key={order.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-4 py-3 font-medium">{order.fullName}</td>
                    <td className="px-4 py-3">{order.email}</td> 
                    <td className="px-4 py-3">
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity} →{" "}
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              ${item.total.toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                      ${totalPrice.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
