import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/product/ProductCard";
import CurrencyFormat from "../../Components/Currencyformat/CurrencyFormat1";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";

const Cart = () => {
  // 1. Fixed destructuring typo from 'basketn' to 'basket'
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate total price safely
  const total = basket?.reduce((amount, item) => item.price + amount, 0) || 0;

  return (
    <LayOut>
      <section className={classes.container}>
        {/* Left Side: Cart Items List */}
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps! No item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                renderAdd={false}
                flex={true}
              />
            ))
          )}
        </div>

        {/* Right Side: Subtotal & Checkout Box */}
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;