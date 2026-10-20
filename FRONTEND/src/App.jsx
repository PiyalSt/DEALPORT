import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import OrderManagement from "./pages/OrderManagement";
import Customers from "./pages/Customers";
import AddProduct from "./pages/AddProduct";
import AdminProfile from "./pages/AdminProfile";
import { Toaster } from "react-hot-toast";
import Categories from "./pages/Categories";
import CouponCode from "./pages/CouponCode";
import Transaction from "./pages/Transaction";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          {/* Dashboard routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<OrderManagement />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/couponcode" element={<CouponCode />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/addproducts" element={<AddProduct />} />
            <Route path="/adminprofile" element={<AdminProfile />} />
          </Route>

          {/* Ecommerce Home page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cartpage" element={<CartPage />} />
        </Routes>
      </BrowserRouter>

      {/* Toaster */}
      <Toaster />
    </div>
  );
};

export default App;
