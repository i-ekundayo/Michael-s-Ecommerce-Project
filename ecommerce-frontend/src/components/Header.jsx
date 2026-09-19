import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import Logo from "../assets/images/new-logo.png";
import "./Header.css";

const Header = ({ cart }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const isOrdersPage = location.pathname === "/orders"; 

  const searchInputText = (e) => {
    const input = e.target.value;

    setSearchInput(input);

    if (input.trim()) {
      navigate(`/home?search=${encodeURIComponent(input)}`);
    } else {
      navigate("/home");
    }
  };

  const handleSearch = () => {
    navigate(`/home?search=${encodeURIComponent(searchInput)}`);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <header className="header">
      <div className="header-top">
        {/* Logo */}
        <div className="left-section">
          <NavLink
            to="/home"
            className="header-link logo-link"
            onClick={closeMenu}
          >
            <img className="logo" src={Logo} alt="NexaCart" />
            <p>NexaCart</p>
          </NavLink>
        </div>

        {/* Desktop Search */}
        {!isOrdersPage && (
          <div className="middle-section">
            <input
              className="search-bar"
              type="text"
              placeholder="Search"
              onChange={searchInputText}
              value={searchInput}
            />

            <button className="search-button" onClick={handleSearch}>
              <img src={SearchIcon} className="search-icon" alt="Search" />
            </button>
          </div>
        )}

        {/* Right Section */}
        <div className="right-section">
          <div className="user-name desktop-user">
            <span className="welcome-text">Welcome,</span>
            <span className="name-text">{user?.name}</span>
          </div>

          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} alt="Cart" />

            <div className="cart-quantity">{totalQuantity}</div>

            <div className="cart-text">Cart</div>
          </NavLink>

          <div className="desktop-logout">
            <Logout />
          </div>

          {/* Hamburger */}
          <button
            className="hamburger-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {!isOrdersPage && (
        <div className="mobile-search">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={searchInputText}
            value={searchInput}
          />

          <button className="search-button" onClick={handleSearch}>
            <img src={SearchIcon} className="search-icon" alt="Search" />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={closeMenu} />

          <div className="mobile-menu">
            <div className="user-name mobile-user">
              <span className="welcome-text">Welcome,</span>
              <span className="name-text">{user?.name}</span>
            </div>

            <NavLink
              className="mobile-menu-link"
              to="/orders"
              onClick={closeMenu}
            >
              Orders
            </NavLink>

            <div className="mobile-logout">
              <Logout />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
