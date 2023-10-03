import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64e0caef50713530432cafa1.mockapi.io/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(products);
  return (
    <>
      <div className="products">
        <div className="product-list">
          <h2>Product List</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <div className="product">
                  <h3>{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <img src={product.image} alt="" className="prod-img" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Products;
