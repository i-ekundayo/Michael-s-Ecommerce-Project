import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import Logo from "../assets/images/new-logo.png";
import "./Header.css";
const Header = ({ cart }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchInputText = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    if (input.trim()) {
      navigate(`/home?search=${encodeURIComponent(input)}`);
    } else {
      navigate("/home");
    }
  };
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <>
      {" "}
      <div className="header">
        {" "}
        <div className="left-section">
          {" "}
          <NavLink to="/home" className="header-link logo-link">
            {" "}
            <img className="logo" src={Logo} /> <p>NexaCart</p>{" "}
          </NavLink>{" "}
        </div>{" "}
        <div className="middle-section">
          {" "}
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={searchInputText}
            value={searchInput}
          />{" "}
          <button
            className="search-button"
            onClick={() =>
              navigate(`/home?search=${encodeURIComponent(searchInput)}`)
            }
          >
            {" "}
            <img src={SearchIcon} className="search-icon" />{" "}
          </button>{" "}
        </div>{" "}
        <div className="right-section">
          <div className="user-name">
            <span className="welcome-text">Welcome,</span>
            <span className="name-text">{user?.name}</span>
          </div>
          <NavLink className="orders-link header-link" to="/orders">
            {" "}
            <span className="orders-text">Orders</span>{" "}
          </NavLink>{" "}
          <NavLink className="cart-link header-link" to="/checkout">
            {" "}
            <img className="cart-icon" src={CartIcon} />{" "}
            <div className="cart-quantity">{totalQuantity}</div>{" "}
            <div className="cart-text">Cart</div>{" "}
          </NavLink>{" "}
          <Logout />{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};
export default Header;
