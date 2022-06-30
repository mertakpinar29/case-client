import {
  Navbar,
  Container,
  Card,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import "./App.css";
import ItemCard from "./Components/ItemCard";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

function App() {
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    variant: "",
  });
  const { search } = useLocation();
  const { session_id } = queryString.parse(search);

  const getPaymentInformation = async () => {
    const response = await fetch(
      "https://stripe-server-case.herokuapp.com/payment-success/" + session_id
    );
    const json = await response.json();
    if (json?.session && json?.customer) {
      setAlert({
        visible: true,
        message: `Payment was successful. Receipt will be sent to ${json.customer.email}`,
        variant: "success",
      });
    } else {
      setAlert({
        visible: true,
        message: "Something went wrong.",
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (session_id) {
      getPaymentInformation();
    }
  }, []);

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>E-Commerce Website</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Alert
          onClose={() => setAlert({ variant: "", message: "", visible: false })}
          variant={alert.variant}
          style={{ display: alert.visible ? "" : "none" }}
          className="mt-2"
        >
          {alert.message}
        </Alert>
        <Row>
          <Col xs={12} md={6} lg={4} xl={3}>
            <ItemCard />
          </Col>
          <Col xs={12} md={6} lg={4} xl={3}>
            <ItemCard />
          </Col>
          <Col xs={12} md={6} lg={4} xl={3}>
            <ItemCard />
          </Col>
          <Col xs={12} md={6} lg={4} xl={3}>
            <ItemCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
