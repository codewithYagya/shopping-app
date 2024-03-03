import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItem } from "./../Redux/CartSlice"


const Cart = () => {
  // Redux dispatch function
  const dispatch = useDispatch()

  // State to manage total price and current items in the cart
  const [price, setPrice] = useState(0);
  const [currentItems, setCurrentItems] = useState();

  // Retrieve cart items from Redux store
  const lengthItems = useSelector((state) => state.cartDetail.value);

  // Function to handle item removal from the cart
  const handleRemove = (e, item) => {
    dispatch(removeCartItem(item))
    setCurrentItems(lengthItems);
  };

  // Function to calculate and update the total price of items in the cart
  const handlePrice = () => {
    let ans = 0;
    lengthItems?.map((item) => ans += item.price);
    setPrice(ans);
  };

  // Effect to update total price and current items when the cart items change
  useEffect(() => {
    handlePrice();
    setCurrentItems(lengthItems);

  }, [lengthItems]);

  return (
    <article>
      {currentItems?.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.thumbnail} alt="" />
            <p>{item.title}</p>
          </div>
          <div>
            <span>{'Price :-' + ' ' + item.price}</span>
            <button className="btn btn-danger d-flex" onClick={(e) => handleRemove(e, item)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="text-dark d-flex justify-content-between">
        <h3>Total Price of your Cart</h3>
        <span>Rs - {price}</span>
      </div>
    </article>
  );
};

export default Cart;
