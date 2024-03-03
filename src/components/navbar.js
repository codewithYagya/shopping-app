import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  // Get the number of items in the cart from the Redux store
  const lengthItems = useSelector((state) => state.cartDetail.value);
  console.log(`lengthItems`, lengthItems);
  // Render the Navbar component
  return (
    <div className="navbar">
      <div className="nav_box">
        {/* Shop name and navigation links */}
        <span className="my_shop">
          <Link to={`/`} style={{ color: "white", textDecoration: "none" }}>
            P MART
          </Link>
          {/* Link to sell products */}
          <Link to={`/addProduct`} style={{ textDecoration: "none" }}>
            <span className="mx-5 text-white" style={{ fontSize: "15px" }}>
              Sell Product
            </span>
          </Link>
          {/* Help link */}
          <span style={{ fontSize: "15px" }}>Help</span>
        </span>
        {/* Cart icon and link */}
        <div className="cart">
          <Link to={`/Cart`} style={{ textDecoration: "none" }}>
            <span>
              <i className="fas fa-cart-plus"></i>
            </span>
            <span>{lengthItems?.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
