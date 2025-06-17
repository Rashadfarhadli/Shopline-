import React, { useState, useEffect } from "react"; 
import ProductsTable from "./ProductsTable"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Boxes,
  Users,
  ShoppingCart,
  Mail,
  Home as HomeIcon,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a83279", "#3264a8"];

const pages = {
  home: "Dashboard əsas səhifəsi",
  products: "Products bölməsi",
  users: "Users bölməsi",
  orders: "Orders bölməsi",
  contact: "Contact bölməsi",
};


function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">{message}</h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-400 transition"
          >
            İmtina
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersTable() {
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
  );
}

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5005/users")
      .then((res) => res.json())
      .then((data) => {
        const modifiedUsers = data.map((user) => ({
          ...user,
          fakePassword: Math.random().toString(36).slice(2, 10),
        }));
        setUsers(modifiedUsers);
        setLoading(false);
        toast.success("İstifadəçilər uğurla yükləndi");
      })
      .catch((err) => {
        console.error("Userləri gətirərkən xəta:", err);
        toast.error("İstifadəçilər yüklənərkən xəta baş verdi");
        setLoading(false);
      });
  }, []);

 
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  
  const handleConfirmDelete = () => {
    fetch(`http://localhost:5005/users/${deleteId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== deleteId));
        toast.success("İstifadəçi uğurla silindi");
      })
      .catch((err) => {
        console.error("Silinərkən xəta:", err);
        toast.error("İstifadəçi silinərkən xəta baş verdi");
      })
      .finally(() => {
        setConfirmOpen(false);
        setDeleteId(null);
      });
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(term) ||
      user.id.toString().includes(term)
    );
  });

  if (loading) return <p>Yüklənir...</p>;
  if (filteredUsers.length === 0) return <p>Axtarış üzrə heç bir istifadəçi tapılmadı.</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ID və ya Email üzrə axtar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Ad</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Şifrə (Fake)</th>
              <th className="px-4 py-2">Əməliyyat</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-gray-300">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 font-mono">{user.fakePassword}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="İstifadəçini silmək istədiyinizə əminsiniz?"
      />
    </div>
  );
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");

  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loadingCharts, setLoadingCharts] = useState(true);

  useEffect(() => {
    if (activePage === "home") {
      setLoadingCharts(true);
      fetch("http://localhost:5005/orders")
        .then((res) => res.json())
        .then((orders) => {
          const productCounts = {};
          orders.forEach((order) => {
            order.items.forEach((item) => {
              productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
            });
          });

          const barChartData = Object.entries(productCounts).map(([name, quantity]) => ({
            name,
            quantity,
          }));

          const pieChartData = Object.entries(productCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, quantity]) => ({
              name,
              value: quantity,
            }));

          setBarData(barChartData);
          setPieData(pieChartData);
          setLoadingCharts(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          toast.error("Statistikalar yüklənərkən xəta baş verdi");
          setLoadingCharts(false);
        });
    }
  }, [activePage]);

  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon size={18} /> },
    { id: "products", label: "Products", icon: <Boxes size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left ${
                activePage === item.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-semibold capitalize">{activePage}</h2>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {activePage === "home" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{pages.home}</h3>

              {loadingCharts ? (
                <p>Statistikalar yüklənir...</p>
              ) : (
                <div className="space-y-10">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md max-w-full">
                    <h4 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">
                      Məhsulların Ümumi Satış Miqdarı
                    </h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={barData}
                        margin={{ top: 15, right: 20, left: 10, bottom: 60 }}
                        barCategoryGap="15%"
                      >
                        <XAxis
                          dataKey="name"
                          stroke="#8884d8"
                          interval={0}
                          angle={-40}
                          textAnchor="end"
                          height={60}
                          tick={{ fill: "#8884d8", fontSize: 10 }}
                        />
                        <YAxis
                          allowDecimals={false}
                          stroke="#8884d8"
                          tick={{ fill: "#8884d8", fontSize: 10 }}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#333", borderRadius: "8px" }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="quantity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md max-w-full">
                    <h4 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">
                      Ən Populyar Top 5 Məhsul
                    </h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label={{ fontSize: 11 }}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                          verticalAlign="bottom"
                          height={30}
                          wrapperStyle={{ fontSize: 11 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {activePage === "users" && <UsersTable />}

          {activePage === "products" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{pages.products}</h3>
              <ProductsTable />
            </div>
          )}

          {activePage === "orders" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">{pages.orders}</h3>
              <OrdersTable />
            </div>
          )}

          {activePage === "contact" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">{pages.contact}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {activePage} ilə bağlı əsas məlumatlar burada olacaq...
              </p>
            </div>
          )}
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
