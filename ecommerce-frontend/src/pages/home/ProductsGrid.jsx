import Product from "./Product";

const ProductsGrid = ({ products, loadCart }) => {
  return (
    <div className="products-grid" style={{padding: "2rem"}}>
      {products.map((product) => {
        return (
          <Product key={product.id} loadCart={loadCart} product={product} />
        );
      })}
    </div>
  );
};

export default ProductsGrid;
