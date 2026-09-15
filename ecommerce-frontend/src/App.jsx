import axios from "axios";
import api from "./api/axios";
import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  const cartRequestId = useRef(0);

  const loadCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    const requestId = ++cartRequestId.current;

    try {
      const response = await api.get("/cart-items?expand=product");

      // Ignore an older request if a newer one has already started
      if (requestId === cartRequestId.current) {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);

      if (requestId === cartRequestId.current) {
        setCart([]);
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      cartRequestId.current += 1;
      setCart([]);
    }
  }, [user]);

  window.axios = axios;

  return (
    <Routes>
      {/* Public routes */}
      <Route index element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="home"
          element={<HomePage cart={cart} loadCart={loadCart} />}
        />

        <Route
          path="checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart} />}
        />

        <Route
          path="orders"
          element={<OrdersPage cart={cart} loadCart={loadCart} />}
        />

        <Route
          path="tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />

        <Route path="*" element={<NotFoundPage cart={cart} />} />
      </Route>
    </Routes>
  );
}

export default App;
