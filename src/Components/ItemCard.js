import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import CheckoutButton from "./CheckoutButton";
import { useStripe } from "@stripe/react-stripe-js";

const ItemCard = () => {
  const stripe = useStripe();

  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);

  const send = async () => {
    const response = await fetch(
      "https://stripe-server-case.herokuapp.com/create-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 2000,
          currency: "usd",
          itemName: "Test Product",
          quantity,
          email,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json?.session) {
      stripe.redirectToCheckout({ sessionId: json.session.id });
    }
  };

  return (
    <Card style={{ width: "18rem" }} className="mt-4">
      <Card.Img
        variant="top"
        src="https://m.media-amazon.com/images/I/41Eg2BXFiqL.jpg"
      />
      <Card.Body>
        <Card.Title>Test Product</Card.Title>
        <Card.Text>
          You can test Stripe payments with that product. In order to continue
          to checkout page, you must enter your email first.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Price: 20$</ListGroupItem>
        <ListGroupItem>
          Quantity:{" "}
          <span
            onClick={(e) => {
              if (quantity - 1 < 0) {
                setQuantity(0);
              } else {
                setQuantity(quantity - 1);
              }
            }}
            style={{
              fontSize: 30,
              marginLeft: 5,
              marginRight: 5,
              cursor: "pointer",
            }}
          >
            -
          </span>{" "}
          <span style={{ fontSize: 25, marginRight: 5 }}>{quantity}</span>{" "}
          <span
            onClick={(e) => {
              setQuantity(quantity + 1);
            }}
            style={{ fontSize: 25, cursor: "pointer" }}
          >
            +
          </span>
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Form.Control
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <CheckoutButton press={send} active={email.length > 0} />
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
