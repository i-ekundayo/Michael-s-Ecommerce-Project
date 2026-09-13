import axios from "axios";
import { useState } from "react";
import formatMoney from "../../utils/money";

const CardItemDetails = ({ cartItem, loadCart }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateCartItem = async () => {
    if (isUpdating === true) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity,
      });
      setIsUpdating(false);
    } else {
      setIsUpdating(true);
    }

    await loadCart();
  };

  const quantityInput = (e) => {
    const value = Number(e.target.value);
    setQuantity(value);
  };

  const updateCartWithKey = (e) => {
    if(e.key === "Enter") {
      updateCartItem();
    }
    if(e.key === "Escape") {
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdating === true ? (
              <input
                type="text"
                className="update-quantity-input"
                value={quantity}
                onChange={quantityInput}
                onKeyDown={updateCartWithKey}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>

          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
};

export default CardItemDetails;
