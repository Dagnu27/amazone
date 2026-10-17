import React, { useContext, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Payment.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/Currencyformat/CurrencyFormat1';
import { axiosInstance } from '../../Api/axios';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe has not yet loaded.
    }

    try {
      setProcessing(true);

      // 1. Backend: Call backend to get the client secret (Fixed template literal & multiplier)
      const response = await axiosInstance({
        method: "post",
        url: `/payments/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      // 2. Client Side: Confirm payment on the client side using Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Fixed: must use CardElement here
        },
      });

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      // 3. After confirmation: Save order to Firestore
// 3. Clean the basket data to remove/replace any undefined fields
      const sanitizedBasket = basket.map((item) => ({
        id: item.id || "",
        title: item.title || "",
        image: item.image || "",
        price: item.price || 0,
        rating: item.rating || 0,
        amount: item.amount || 1,
      }));

      // After confirmation: Save order to Firestore safely
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: sanitizedBasket, // Use the sanitized array here
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // 4. Clear the basket in your global state/context
      dispatch({ type: "EMPTY_BASKET" });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed your new order" } });

    } catch (error) {
      console.log(error);
      setCardError(error.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
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
              <form onSubmit={handlePayment}>
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                <CardElement onChange={handleChange} />

                {/* Price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order : <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing || !stripe}>
                    {
                      processing ? (
                        <div className={classes.loader}>
                          <p>Please wait...</p>
                        </div>
                      ) : "Pay Now"
                    }
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