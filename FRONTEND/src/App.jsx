import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import OrderManagement from "./pages/OrderManagement";
import Customers from "./pages/Customers";
import AddProduct from "./pages/AddProduct";
import AdminProfile from "./pages/AdminProfile";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="/order" element={<OrderManagement />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/addproducts" element={<AddProduct />} />
            <Route path="/adminprofile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Toaster */}
      <Toaster />
    </div>
  );
};

export default App;
