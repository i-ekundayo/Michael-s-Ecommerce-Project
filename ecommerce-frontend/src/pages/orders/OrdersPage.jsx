import api from "../../api/axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import OrderHeader from "./OrderHeader";
import OrdersGrid from "./OrdersGrid";
import "./OrdersPage.css";

const OrdersPage = ({ cart, loadCart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await api.get("/orders?expand=products");
      setOrders(response.data);
    };

    fetchOrdersData();
  }, []);
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <OrderHeader order={order} />

                <OrdersGrid order={order} loadCart={loadCart} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
