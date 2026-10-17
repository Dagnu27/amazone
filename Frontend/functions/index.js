
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in functions/.env");
}

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Amazon payment API is running!",
  });
});

app.post("/payments/create", async (req, res) => {
  try {
    const total = Number(req.query.total);

    if (!Number.isInteger(total) || total <= 0) {
      return res.status(400).json({
        message: "total must be a positive integer in cents",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    logger.error("Payment creation failed", error);

    return res.status(500).json({
      message: "Unable to create payment",
    });
  }
});

exports.api = onRequest(app);
