import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
// import Logo from "../../assets/images/new-logo.png";
import "./AuthPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
  
    setError("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
  
      console.log(response.data);
  
      navigate("/");
    } catch (error) {
      console.log("Registration failed:", error);
  
      setError(
        error.response?.data?.error ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      {/* Left image section */}
      <div className="auth-image-section">
        <div className="auth-image-overlay">
          <h2>Start shopping.</h2>

          <p>
            Create an account and enjoy a simple and seamless shopping
            experience.
          </p>
        </div>
      </div>

      {/* Right registration section */}
      <div className="auth-form-section">
        <div className="auth-container">
          {/* Brand */}
          {/* <div className="auth-brand register-brand">
            <Link to={"/"} className="auth-brand-link ">
              <img className="logo" src={Logo} />
              <p>NexaCart</p>
            </Link>
          </div> */}

          <h1 className="auth-title">Create an account</h1>

          <p className="auth-subtitle">Sign up to start shopping with us.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full name */}
            <div className="form-group">
              <label htmlFor="name">Full name</label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            {/* Confirm password */}
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm password</label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            {/* Error */}
            {error && <div className="auth-error">{error}</div>}

            {/* Submit */}
            <button
              type="submit"
              className="button-primary auth-button"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login link */}
          <p className="auth-footer">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
