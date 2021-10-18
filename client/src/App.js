import logo from "./logo.svg";
import React, { useState } from "react";
import axios from "axios";
import FormComponent from "./form";
import "./App.css";

const App = () => {
  const url = "";
  const key_id = "";
  const initialState = {
    name: "Example",
    currency: "INR",
    amount: "50000",
    contact: "9999999999",
    order_id: "1234",
    email: "abc@example.com",
    address: "abc colony,XYZ",
  };

  const [inputFieldValues, setInputFieldValues] = useState(initialState);

  const onChangeInputFields = (e) => {
    let obj = { ...inputFieldValues, [e.target.name]: e.target.value };
    setInputFieldValues(obj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make an api call to fetch the order_id
    const payload = {
      amount: inputFieldValues.amount,
      currency: inputFieldValues.currency,
      receipt: "rcptid_11",
      order_id: inputFieldValues.order_id,
    };

    const result = await axios.post(
      `${url}/payment/service/razorpay/createOrderID`,
      payload
    );
    if (result.status !== 200) {
      return;
    }
    var options = {
      key: key_id, // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: logo,
      order_id: result.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        let payload = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          prefill: options.prefill,
          notes: options.notes,
          amount: options.amount,
          currency: options.currency,
        };
        const result = await axios.post(
          `${url}/payment/service/razorpay/success`,
          payload
        );
        // If Signature matched route the page to success else to failure page
        console.log(result);
      },
      prefill: {
        name: inputFieldValues.name,
        email: inputFieldValues.email,
        contact: inputFieldValues.contact,
      },
      notes: {
        address: inputFieldValues.address,
        order_id: inputFieldValues.order_id,
      },
      theme: {
        color: "#32CD30",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", async function (response) {
      const result = await axios.post(
        `${url}/payment/service/razorpay/failure`,
        response
      );
      console.log(result);
      rzp1.close();
    });
    rzp1.open();
  };
  return (
    <div className="checkout">
      <h2 className="checkout__header">Checkout Page</h2>
      <FormComponent
        inputFieldValues={inputFieldValues}
        onInputChange={onChangeInputFields}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
