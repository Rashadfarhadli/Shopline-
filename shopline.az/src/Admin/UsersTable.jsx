import React, { useState, useEffect } from "react";

import {
  Boxes,
  Users,
  ShoppingCart,
  Mail,
  Home as HomeIcon,
} from "lucide-react";

import OrderStatsChart from "../components/OrderStatsChart";

const pages = {
  home: "Dashboard əsas səhifəsi",
  products: "Products bölməsi",
  users: "Users bölməsi",
  orders: "Orders bölməsi",
  contact: "Contact bölməsi",
};

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


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
      })
      .catch((err) => {
        console.error("Userləri gətirərkən xəta:", err);
        setLoading(false);
      });
  }, []);


  const handleDelete = (id) => {
    if (!window.confirm("İstifadəçini silmək istədiyinizə əminsiniz?")) return;

    fetch(`http://localhost:5005/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => console.error("Silinərkən xəta:", err));
  };

  if (loading) return <p>Yüklənir...</p>;
  if (users.length === 0) return <p>Heç bir istifadəçi tapılmadı.</p>;

  return (
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
          {users.map((user) => (
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
                  onClick={() => handleDelete(user.id)}
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
  );
}

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
          {activePage === "home" && <OrderStatsChart darkMode={darkMode} />}
          {activePage === "users" && <UsersTable />}
          {activePage !== "home" && activePage !== "users" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">{pages[activePage]}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {activePage} ilə bağlı əsas məlumatlar burada olacaq...
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}   