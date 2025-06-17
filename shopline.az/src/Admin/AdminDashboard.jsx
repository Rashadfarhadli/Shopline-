import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./Sidebar";
import DashboardCharts from "./DashboardCharts";
import UsersTable from "./UsersTable/UsersTable";
import ProductsTable from "./ProductsTable/ProductsTable";
import OrdersTable from ".//OrdersTable/OrdersTable";
import ContactsTable from "./ContactTable/ContactsTable";

const pages = {
  home: "Dashboard əsas səhifəsi",
  products: "Products bölməsi",
  users: "Users bölməsi",
  orders: "Orders bölməsi",
  contact: "Contact bölməsi",
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-semibold capitalize">{activePage}</h2>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {activePage === "home" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{pages.home}</h3>
              <DashboardCharts />
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
              <h3 className="text-lg font-semibold mb-4">{pages.contact}</h3>
              <ContactsTable />
            </div>
          )}
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}