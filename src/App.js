// Importing React and necessary components and functions from libraries
import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Navbar from "./components/navbar";
import Cart from "./components/cart";
import { toast } from "react-toastify";
import ToastNotification from "./components/ToastNotification";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import { addcartItem } from "./Redux/CartSlice";
import { useDispatch } from "react-redux";
import ProductDetails from "./components/Pdp";

// Main App component
const App = () => {
  // State variables for managing cart items, product details page, and Redux dispatch
  const [cart, setCart] = useState([]);
  const [productDetailspage, setProductDetailspage] = useState();
  const dispatch = useDispatch();

  // Function to handle adding items to the cart
  const handleClick = (e, item) => {
    // Checking if the item is already in the cart
    if (cart.indexOf(item) !== -1) return;

    // Updating the cart state with the new item
    setCart([...cart, item]);

    try {
      // Dispatching the addcartItem action to update Redux store
      dispatch(addcartItem(item));
      toast.success(`Added to Cart`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to handle changing the quantity of items in the cart
  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].amount += d;

    // Ensuring the item amount is never less than 1
    if (arr[ind].amount === 0) arr[ind].amount = 1;

    // Updating the cart state with the modified item
    setCart([...arr]);
  };

  // Function to handle displaying product details page
  const handlePdp = (e, item) => {
    console.log(`item of pdp`, item);
    setProductDetailspage(item);
  };

  // Rendering the components using React Router
  return (
    <>
      <Router>
        {/* Navbar component */}
        <Navbar />
        <div className="container">
          <Routes>
            {/* Route for the main page */}
            <Route
              exact
              path="/"
              element={<Main handleClick={handleClick} handlePdp={handlePdp} />}
            ></Route>

            {/* Route for the cart page */}
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  setCart={setCart}
                  handleChange={handleChange}
                />
              }
            ></Route>

            {/* Route for the addProduct page */}
            <Route exact path="/addProduct" element={<AddProduct />}></Route>

            {/* Route for the productDetails page */}
            <Route
              exact
              path="/productDetails"
              element={
                <ProductDetails
                  handleClick={handleClick}
                  productDetailspage={productDetailspage}
                />
              }
            ></Route>
          </Routes>

          {/* ToastNotification component */}
          <ToastNotification />
        </div>
      </Router>
    </>
  );
};

// Exporting the App component
export default App;
