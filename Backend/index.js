
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Firebase!" });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(404).json({
      message: "total must be greater than zero",
    });
  }
});
app.listen(5000,(err)=>{
 if (err) throw err
  
 console.log("amazone server running on the port :5000 ,http://localhost:5000 ")
})
