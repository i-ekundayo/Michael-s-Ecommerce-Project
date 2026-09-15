import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import CheckoutHeader from "./CheckoutHeader";
import "./CheckoutPage.css";

const CheckoutPage = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await api.get(
        "/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(response.data);
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      if (!user) {
        setPaymentSummary(null);
        return;
      }

      try {
        const response = await api.get("/payment-summary");
        setPaymentSummary(response.data);
      } catch (error) {
        console.error("Failed to load payment summary:", error);
        setPaymentSummary(null);
      }
    };

    fetchPaymentSummary();
  }, [user, cart]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader paymentSummary={paymentSummary} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
