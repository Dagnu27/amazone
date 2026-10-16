import React, { useContext, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Payment.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import  ProductCard  from '../../Components/product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/Currencyformat/CurrencyFormat1';

function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0) || 0;

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0) || 0;

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handeleProduct = async (e) => {
    e.preventDefault()
    // function make contaacting is the very mandatory
    
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.Payment_header}>
        Checkout ({totalItem}) items
      </div>

      {/* Payment Method Section */}
      <section className={classes.Payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* Product Review */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Card Details */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.Payment_Card_Container}>
            <div className={classes.Payment_detaile}>
              <form onSubmit={handeleProduct}>
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                <CardElement onChange={handleChange} />
                
                {/* Price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order : <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;