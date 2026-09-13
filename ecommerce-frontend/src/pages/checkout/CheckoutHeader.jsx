import { Link } from "react-router";
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
// import Logo from '../../assets/images/logo.png';
import MobileLogo from '../../assets/images/mobile-logo.png';
import Logo from "../../assets/images/new-logo.png";
import "./CheckoutHeader.css";

const CheckoutHeader = () => {
  return (
    <div>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/home" className="checkout-header-logo-link">
                <img className="logo" src={Logo} />
                <p className="checkout-header-logo">NexaCart</p>
              {/* <img className="logo" src={Logo} />
              <img className="mobile-logo" src={MobileLogo} /> */}
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/home">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src={CheckoutLockIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
