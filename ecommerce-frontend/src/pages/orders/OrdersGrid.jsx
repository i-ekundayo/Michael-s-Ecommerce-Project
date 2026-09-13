import OrderDetailsGrid from "./OrderDetailsGrid";


const OrdersGrid = ({order, loadCart}) => {
  return (
    <div>
      <OrderDetailsGrid order={order} loadCart={loadCart} />
    </div>
  );
};

export default OrdersGrid;
