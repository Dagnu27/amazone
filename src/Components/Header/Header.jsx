import React from 'react';
import classes from "./Header.module.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
const Header = () => {
  return (
    <>
    <section className={classes.header_container}>
      {/* Logo & Delivery Section */}
      <div className={classes.logo_container}>
        <a href="/">
          <img 
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
            alt="Amazon Logo" 
          />
        </a>

        <div className={classes.delivery}>
          <span>
            <SlLocationPin />
          </span>
          <div>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={classes.search}>
        <select name="category" id="category">
          <option value="">All</option>
        </select>
        <input type="text" placeholder="Search product" />
        <FaSearch size={38} />
      </div>

      {/* Right Navigation / Account / Cart */}
      <div className={classes.order_container}>
        <a href="/" className={classes.language}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
            alt="US Flag" 
          />
          <select name="language" id="language">
            <option value="EN">EN</option>
          </select>
        </a>

        <a href="/signin">
          <p>Sign in</p>
          <span>Account & Lists</span>
        </a>

        <a href="/orders">
          <p>Returns</p>
          <span>& Orders</span>
        </a>

        {/* Cart */}
        <a href="/cart" className={classes.cart}>
          <FaShoppingCart size={35} />
          <span>0</span>
        </a>
      </div>
    </section>
    <LowerHeader/>
    </>
  );
};

export default Header;