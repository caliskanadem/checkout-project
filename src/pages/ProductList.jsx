import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CardTotal from "../components/CardTotal";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const url = process.env.REACT_APP_API_URL;
  console.log("api: ", url);
  const getProducts = async () => {
    try {
      setLoading(false);
      const { data } = await axios(url);
      setProducts(data);
      setErrorState(false);
    } catch (error) {
      setErrorState(true);
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);
  return (
    <div className="container mt-3">
      <div className={"bg-light d-sm-block d-md-flex"}>
        {loading ? (
          <p className="text-center text-danger w-100">Loading....</p>
        ) : products.length > 0 ? (
          <>
            <article id="product-panel" className="col-md-5">
              {products.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    getProducts={getProducts}
                  />
                );
              })}
            </article>
            <article className="col-md-5 m-3">
              <CardTotal products={products} />
            </article>
          </>
        ) : (
          !errorState && (
            <p className="text-center text-danger w-100">No products data...</p>
          )
        )}
        {errorState && (
          <p className="text-center text-danger w-100">No data...</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
