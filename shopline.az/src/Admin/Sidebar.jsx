import React from "react";
import { HomeIcon, Boxes, Users, ShoppingCart, Mail } from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon size={18} /> },
    { id: "products", label: "Products", icon: <Boxes size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  return (
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
  );
}

export default Sidebar;