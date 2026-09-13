import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import Logo from "../assets/images/new-logo.png";
import "./Header.css";

const Header = ({ cart }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const getSearchInput = () => {
    navigate(`/home?search=${searchInput}`);
  };

  const searchInputText = (e) => {
    const input = e.target.value;
    setSearchInput(input);
  };

  const getSearchInputWithKey = (e) => {
    if (e.key === "Enter") {
      getSearchInput();
    }
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/home" className="header-link logo-link">
            <img className="logo" src={Logo} />
            <p>NexaCart</p>
            {/* <img className="logo" src={LogoWhite} /> */}
            {/* <img className="mobile-logo" src={MobileLogoWhite} /> */}
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={searchInputText}
            onKeyDown={getSearchInputWithKey}
            value={searchInput}
          />

          <button className="search-button" onClick={getSearchInput}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
