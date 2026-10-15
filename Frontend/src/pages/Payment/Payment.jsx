import React, { useContext } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Payment.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider';
import {ProductCard} from '../../Components/product/ProductCard'
import {useStripe,useElement,cardElement} from '@stripe/stripe-js';
import Card from '@mui/material/Card';
import CurrencyFormat from '../../Components/Currencyformat/CurrencyFormat1';
function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total =basket.reduce((amount,item)=>{
    return item.price*item.amount+amount;
  },0);
  const stripe=useStripe()
  const  elements = useElement()

  const handelChange=(e)=>{
   console.log(e);
   e?.error?.message? setCardError(e?.error?.message):setCardError("")
  }
  return (
    <LayOut>
      {/* {header} */}
      <div className={classes.Payment_header}>
        Checkout ({totalItem}) items
      </div>
      {/* { payment method} */}
      <section className={classes.Payment} >
        {/* adress */}
        <div className={classes.flex}>
          <h3>Delivary address</h3>
          <div>
            <div>{user.email}</div>
            <div>123 React lane </div>
            <div>chicage it</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>review item and delivery</h3>
          <div>
            {
              basket?.map((item)=>(<ProductCard product={item} flex={true}/>) )
            }
          </div>
        </div>
        <hr />

        {/* card */}
        <div className={classes.flex}>
          <h3>payment method </h3>
          <div className={classes.Payment_Card_Container}>
 <div className={classes.Payment_detaile}>
  <form action="" method="get">
    { CardErrer && <small style={{color:"red"}}>{CardErrer}</small>}
      <cardElement onChange={handelChange} />
      {/* price */}
      <div className={classes.payment_price}>
          <div>
             <span>
              Total Order : <CurrencyFormat amount={total}/>
             </span>
          </div>
          <button>Pay know </button>
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