import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/Productdetail/Productdetail";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe('pk_test_51UPjazJm82t4kuB82qToE3tDf63E2kYSMm6gI0UkWmf9e6QSNO1Gn4BP43nx4LUj1McUnNrKscYvqWTyDbZv0s6U00Yn6jcD1D');
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
  <Route path="/payment" element={
     <ProtectedRoute  msg={"you must login to pay "} redirect={"./payments "}>
       <Elements stripe={stripePromise}>

 <Payment />
     </Elements>
     </ProtectedRoute>


   } />
      <Route path="/orders" element={
      <ProtectedRoute  
      msg={"you must login to access your orders "} 
      redirect={"./orders "}>

<Orders />
      </ProtectedRoute>  
        
        } />
      <Route path="/catagory/:catagoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;