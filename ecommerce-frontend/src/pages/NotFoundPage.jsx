import Header from "../components/Header";
import "./NotFoundPage.css";

const NotFoundPage = ({ cart }) => {
  return (
    <div className="not-found-container">
      <Header cart={cart} />

      <div className="not-found">
        <h1>Page Not Found</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;