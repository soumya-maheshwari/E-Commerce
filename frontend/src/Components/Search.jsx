import React, { useState } from "react";
import imgg from "../assets/search.svg";
import { useDispatch } from "react-redux";
import { searchProductThunk } from "../Redux/productSlice";
import SearchComp from "./SearchComp";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  const handleSearchUser = async (query) => {
    setQuery(query);
    // console.log(search);
    if (!query) {
      return;
    } else {
      try {
        // setLoadingUser(true);
        dispatch(searchProductThunk(query))
          .then((res) => {
            // console.log(res);
            setOnSearch(res.payload.data.products);

            if (res.payload.data.products.length > 0) {
              setLoadingUser(false);
            }
            return res;
          })
          .catch((err) => {
            console.log(err);
            return err.response;
          });
      } catch (error) {
        console.log(error);
        return error.response;
      }
    }
  };

  const handleUserSearch = (e) => {
    e.preventDefault();
    alert(query);
    dispatch(searchProductThunk())
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  return (
    <>
      <div className="search-user-body">
        <img
          src={imgg}
          alt="search"
          className="search-icon"
          onClick={handleUserSearch}
        />
        <input
          type="text"
          className="search-user-input"
          value={query}
          placeholder="Search a product."
          onChange={(e) => {
            handleSearchUser(e.target.value);
          }}
        />
      </div>

      {loadingUser ? null : (
        <>
          {onSearch?.slice(0, 1).map((product) => {
            return (
              <>
                <SearchComp
                  name={product.productName}
                  price={product.price}
                  id={product.id}
                  image={product.image}
                />
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default Search;
