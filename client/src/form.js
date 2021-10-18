import React from "react";

const FormComponent = ({ inputFieldValues, onInputChange, handleSubmit }) => {
  const { name, currency, amount, contact, order_id, email, address } =
    inputFieldValues;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label for="name" className="form__label">
        Name:{" "}
      </label>
      <input
        onChange={onInputChange}
        value={name}
        name="name"
        placeholder="Name"
        className="form__input"
      />
      <label for="email" className="form__label">
        Email:{" "}
      </label>
      <input
        onChange={onInputChange}
        value={email}
        name="email"
        placeholder="Email"
        className="form__input"
      />
      <label for="contact" className="form__label">
        Contact:{" "}
      </label>
      <input
        onChange={onInputChange}
        value={contact}
        name="contact"
        placeholder="Contact"
        className="form__input"
      />
      <label for="address" className="form__label">
        Address:{" "}
      </label>
      <input
        onChange={onInputChange}
        value={address}
        name="address"
        placeholder="Address"
        className="form__input"
      />
      <label for="amount" className="form__label">
        Amount:{" "}
      </label>
      <input
        onChange={onInputChange}
        value={amount}
        name="amount"
        placeholder="Amount"
        className="form__input"
      />
      <label for="currency" className="form__label">
        Currency:{" "}
      </label>
      <input
        onChange={onInputChange}
        value={currency}
        name="currency"
        placeholder="Currency"
        className="form__input"
      />
      <label for="order_id" className="form__label">
        Order ID:{" "}
      </label>
      <input
        onChange={onInputChange}
        value={order_id}
        name="order_id"
        placeholder="Order ID"
        className="form__input"
      />
      <input type="submit" value="Submit" className="form__submit" />
    </form>
  );
};

export default FormComponent;
