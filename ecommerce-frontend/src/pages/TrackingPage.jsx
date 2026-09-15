import api from "../api/axios";
import dayjs from "dayjs";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router";
import Header from "../components/Header";
import { getImageUrl } from "../utils/helper";
import "./TrackingPage.css";

const TrackingPage = ({ cart }) => {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await api.get(`/orders/${orderId}?expand=products`);

        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    getOrderData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryPercent >= 100) {
    deliveryPercent = 100;
  }
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >=33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent >= 100;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>
          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered On " : "Arriving on "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>
          <div className="product-info">{orderProduct.product.name}</div>
          <div className="product-info">Quantity: {orderProduct.quantity}</div>
          <img className="product-image" src={getImageUrl(orderProduct.product.image)} />
          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingPage;
