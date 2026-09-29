import React, { useContext } from 'react';
import classes from "./Header.module.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { DataContext } from "../DataProvider/DataProvider";

const Header = () => {
  const [{ basket }, dispatch] = useContext(DataContext);

  return (
    <>
      <section className={classes.header_container}>
        {/* Logo & Delivery Section */}
        <div className={classes.logo_container}>
          <Link to="/">
            <img 
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
              alt="Amazon Logo" 
            />
          </Link>

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
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
          </select>
          <input type="text" placeholder="Search product" />
          <FaSearch size={25} />
        </div>

        {/* Right Navigation / Account / Cart */}
        <div className={classes.order_container}>
          <div className={classes.language}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
              alt="US Flag" 
            />
            <select name="language" id="language">
              <option value="EN">EN</option>
            </select>
          </div>

          <Link to="/auth">
            <p>Sign in</p>
            <span>Account & Lists</span>
          </Link>

          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={classes.cart}>
            <FaShoppingCart size={35} />
            <span>{basket?.length || 0}</span>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;