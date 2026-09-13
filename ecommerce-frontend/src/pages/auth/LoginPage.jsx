import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "../../assets/images/new-logo.png";
import "./AuthPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // If your backend returns a token:
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/home");
    } catch (error) {
      console.log("Login failed:", error);

      setError(
        error.response?.data?.error ||
          "Invalid email or password. Please try again.",
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
          <h2>Shop smarter.</h2>
          <p>
            Discover products you love and enjoy a seamless shopping experience.
          </p>
        </div>
      </div>

      {/* Right login section */}
      <div className="auth-form-section">
        <div className="auth-container">
          <div className="auth-brand">
            <Link to={"/"} className="auth-brand-link">
              <img className="logo" src={Logo} />
              <p>NexaCart</p>
            </Link>
          </div>

          <h1 className="auth-title">Welcome back</h1>

          <p className="auth-subtitle">
            Sign in to your account to continue shopping.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
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

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button
              type="submit"
              className="button-primary auth-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
