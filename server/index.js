require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = 8080;


// app.use("/stripe", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: "Server is Running" });
})
app.post("/pay", async (req, res) => {
  try {
    const { logInUserData, selectedAddress, price } = req.body;
    const { name, email, mobile } = logInUserData;

    if (!name) return res.status(400).json({ message: "Please enter a name" });

    const customer = await stripe.customers.create({
      name: name,
      email: email,
    });

    const customerId = customer.id;

    if (customerId) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(price * 100),
        currency: "USD",
        payment_method_types: ["card"],
        metadata: { name, email, mobile, selectedAddress },
        customer: customerId,
        receipt_email: email,
      });
      const clientSecret = paymentIntent.client_secret;
      res.json({ message: "Payment initiated", clientSecret });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
