import React from "react";

const SearchComp = (props) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          margin: "0 auto",
          marginBottom: "10vh",
        }}
        // onMouseOver={handleUserClick}
        // onMouseLeave={handleLeave}
        // onClick={handleUserClick}
      >
        <div className="product-card">
          <img src={props.image} alt="" className="prod-img" />
          <h3>{props.name}</h3>
          <p>Price: $ {props.price}</p>

          <div className="btns">
            <button
              className="minus"
              //   onClick={() => handleRemove(product.id)}
            >
              -
            </button>
            <button
              className="add-to-cart"
              //   onClick={() => handleAdd(product.id)}
            >
              ADD
            </button>
            <button
              className="plus"
              //   onClick={() => handleAdd(product.id)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComp;
