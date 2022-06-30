import React from "react";
import ReactDOM from "react-dom/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import App from "./App";

import "./bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// since this is a test publishable key, didn't put it in .env
const stripePromise = loadStripe(
  "pk_test_51LFw4NGvTkFTRjzkIGuuFpmE17UjQ2lkxT4kPyQfT4DmCRMiZrzfTj8TrA8ce3lJ4wliKsttQBzF29wkdcl8mCMu00MsSQHSSh"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </Elements>
  </React.StrictMode>
);
