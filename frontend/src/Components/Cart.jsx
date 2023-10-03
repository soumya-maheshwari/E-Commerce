import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../Redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }, []);
  return (
    <>
      <div className="cart-page"></div>
    </>
  );
};

export default Cart;
