import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCartThunk, removeFromCart } from "../Redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userid = user.user._id;
  console.log(user.user);
  const [product, setProduct] = useState("");
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

  const handleAdd = (product) => {
    const userData = {
      productId: product,
    };
    dispatch(addToCartThunk(userData))
      .then((res) => {
        console.log(res);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`, {
            position: "top-right",
            theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  const handleRemove = (product) => {
    const userData = {
      productId: product,
    };
    console.log(userData);
    dispatch(removeFromCart(userData))
      .then((res) => {
        console.log(res);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`, {
            position: "top-right",
            theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };
  return (
    <>
      <div className="products">
        <div className="product-list">
          <h2
            style={{
              textAlign: "center",
            }}
          >
            Product List
          </h2>
          <ul className="product-grid">
            {products.map((product) => (
              <li key={product.id}>
                <div className="product-card">
                  <img src={product.image} alt="" className="prod-img" />
                  <h3>{product.productName}</h3>
                  <p>Price: $ {product.price}</p>

                  <div className="btns">
                    <button
                      className="minus"
                      onClick={() => handleRemove(product.id)}
                    >
                      -
                    </button>
                    <button
                      className="add-to-cart"
                      onClick={() => handleAdd(product.id)}
                    >
                      ADD
                    </button>
                    <button
                      className="plus"
                      onClick={() => handleAdd(product.id)}
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
      <ToastContainer />
    </>
  );
};

export default Products;
