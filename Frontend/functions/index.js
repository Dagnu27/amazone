const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

dotenv.config();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Firebase!" });
});

app.post("/payments/create", async (req, res) => {
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

exports.api = onRequest(app);