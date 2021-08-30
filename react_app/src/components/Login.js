import React, { useState, useRef } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Table,
  Tooltip
} from "react-bootstrap";


import AuthService from "../services/auth_service";


const Login = (props) => {

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };


  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    AuthService.login(username).then(
      () => {
        props.history.push("/auction_items");
        window.location.reload();
      },
      (error) => {
        const { detail } = error.response.data
        setMessage(detail)
      }
    );

  };

  return (

    <Container>
      <Row className="justify-content-center align-items-center">
        <Col md="6">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Auction App</Card.Title>
              <p className="card-category">Login</p>
            </Card.Header>
            <Card.Body>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    value={username}
                    required
                    onChange={onChangeUsername}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleLogin}>Submit
                </button>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </form>

            </Card.Body>
            <Card.Footer>

            </Card.Footer>
          </Card>


        </Col>
      </Row>
    </Container>
  );
};

export default Login;
