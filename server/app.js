const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

let port = process.env.PORT || 8001;

var razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.get("/", (req, res) => {
  res.send("Server is On");
});

app.post("/payment/service/razorpay/createOrderID", (req, res) => {
  var options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: `order_rcptid_${req.body.order_id}`,
  };
  razorpay.orders.create(options, (err, order) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(order);
  });
});

app.post("/payment/service/razorpay/success", (req, res) => {
  let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === req.body.razorpay_signature) {
    response = { signatureIsValid: "true" };
    return res.send(response);
  }
  // Called The failed api
  return res.send({ signatureIsValid: "false" });
});

// ____________________________BELOW CODE IS USING WEBHOOK_____________________________________
// const hash = crypto
//   .createHmac("SHA256", "razorpahhypoc")
//   .update(JSON.stringify(req.body))
//   .digest("hex");
// const razorpaySignature = req.headers["x-razorpay-signature"];
// compare hash and razorpaySignature

app.post("/payment/service/razorpay/failure", (req, res) => {
  console.log("failed", req);
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
