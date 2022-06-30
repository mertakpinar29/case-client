import React from "react";

const CheckoutButton = ({ active, press }) => {
  return (
    <div
      onClick={press}
      style={{ backgroundColor: !active ? "gray" : "black", cursor: "pointer" }}
      className="w-100 text-white mt-2 d-flex rounded justify-content-center"
    >
      <p className="mt-3">Proceed to checkout</p>
    </div>
  );
};

export default CheckoutButton;
