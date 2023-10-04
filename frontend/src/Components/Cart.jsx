import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../Redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState("");

  const [products, setProducts] = useState("");
  const [detailproducts, setDetailProducts] = useState("");

  useEffect(() => {
    dispatch(getAllProducts())
      .then((res) => {
        console.log(res);
        setProducts(res.payload.data.cart);
        setTotal(res.payload.data.total);
        setDetailProducts(res.payload.data.detailedCartItems);
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
        <div className="cart-items">
          <ul className="productt-grid">
            {products &&
              products.map((product) => (
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
                      <button className="add-to-cart">
                        {product.quantity}
                      </button>
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
        <div className="price">
          <p
            className="login-btn"
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "30px",
              width: "26vw",
            }}
          >
            PRICE : $ {total}
          </p>

          <div className="price-table">
            <ul>
              {detailproducts &&
                detailproducts.map((detailProduct) => (
                  <li key={detailProduct.product._id} className="bill-item">
                    <p className="product-name">{detailProduct.product.name}</p>
                    <p className="product-details">
                      {detailProduct.product.price} X {detailProduct.quantity} ={" "}
                      {detailProduct.itemTotal}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
          <div className="total">
            <p>Total : $ {total}</p>
          </div>
        </div>
        <div>
          <span>.</span>
        </div>
      </div>
    </>
  );
};

export default Cart;
