import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../Redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState("");

  useEffect(() => {
    dispatch(getAllProducts())
      .then((res) => {
        console.log(res);
        setProducts(res.payload.data.cart);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  });

  console.log(products);
  return (
    <>
      <div className="cart-page">
        <p className="para">Items added by You</p>

        <div className="cart-items">
          <ul className="product-grid">
            {products.map((product) => (
              <li key={product.id}>
                <div className="product-card">
                  <img
                    src={product.product.image}
                    alt=""
                    className="prod-img"
                  />
                  <h3>{product.product.productName}</h3>
                  <p>Price: $ {product.product.price}</p>

                  <div className="btns">
                    <button
                      className="minus"
                      // onClick={() => handleRemove(product.id)}
                    >
                      -
                    </button>
                    <button className="add-to-cart">{product.quantity}</button>
                    <button
                      className="plus"
                      // onClick={() => handleAdd(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Cart;
