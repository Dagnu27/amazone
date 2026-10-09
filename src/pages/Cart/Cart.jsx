import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/product/ProductCard";
import CurrencyFormat from "../../Components/Currencyformat/CurrencyFormat1";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type"; 
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate total item count (sum of all item amounts)
  const totalItems = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;

  // Calculate total price safely (price * amount)
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0) || 0;

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  // 2. Fixed scope: moved decrement outside increment function
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        {/* Left Side: Cart Items List */}
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section className={classes.cart_product} key={i}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button className={classes.btn} onClick={() => increment(item)}>
                    <FaArrowUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button className={classes.btn} onClick={() => decrement(item.id)}>
                    <FaArrowDown size={20} />
                  </button>
                </div>
              </section> 
            ))
          )}
        </div>

        {/* Right Side: Subtotal & Checkout Box */}
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({totalItems} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" id="gift-check" />
              <label htmlFor="gift-check"><small>This order contains a gift</small></label>
            </span>
            <Link to="/payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;