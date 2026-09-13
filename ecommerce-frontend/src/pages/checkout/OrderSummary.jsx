import DeliveryOptions from "./DeliveryOptions";
import CardItemDetails from "./CardItemDetails";
import DeliveryDate from "./DeliveryDate";

const OrderSummary = ({cart, deliveryOptions, loadCart}) => {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <div className="cart-item-details-grid">
                <CardItemDetails cartItem={cartItem} loadCart={loadCart}/>

                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart}/>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderSummary;
