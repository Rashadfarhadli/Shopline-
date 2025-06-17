import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5005/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
        toast.success("Sifarişlər uğurla yükləndi");
      })
      .catch((err) => {
        console.error("Sifarişləri gətirərkən xəta:", err);
        toast.error("Sifarişlər yüklənərkən xəta baş verdi");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yüklənir...</p>;
  if (orders.length === 0) return <p>Sifariş tapılmadı.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm uppercase text-gray-600 dark:text-gray-300">
            <th className="px-4 py-3">Gmail</th>
            <th className="px-4 py-3">Məhsullar</th>
            <th className="px-4 py-3">Cəmi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const totalPrice = order.items.reduce((sum, item) => sum + item.total, 0);
            return (
              <tr
                key={order.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3">{order.email}</td>
                <td className="px-4 py-3">
                  <div className="max-h-32 overflow-y-auto pr-2 custom-scroll">
                    <ul className="space-y-1 text-sm">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} × {item.quantity} →
                          <span className="text-green-600 dark:text-green-400 font-medium ml-1">
                            ${item.total.toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
  );
}
