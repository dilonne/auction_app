import React, { useState, useEffect } from "react";
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";

import AutoBidService from "../services/autobid_service";
import AuthService from "../services/auth_service";



const AutoBiddingSettings = () => {

  const [maxAmount, setMaxAmount] = useState(null);

  const getAutoBidSettings = () => {
    const user = AuthService.getCurrentUser();
    AutoBidService.getSettings(user.id) 
      .then(r => {
        setMaxAmount(r.data.max_amount);
        console.log(r.data.max_amount);
      })
      .catch(e => {
        console.log(e);
      });
  };


useEffect(() => {
    getAutoBidSettings()
  }, []);

  const onChangeAmount = (e) => {
    const amount = e.target.value;
    setMaxAmount(amount);
  };
  
  const handleUpdateMaxAmount = (e) => {
    e.preventDefault();
    const user = AuthService.getCurrentUser();
    AutoBidService.update(user.id, maxAmount)
      .then(r => {
        setMaxAmount(r.data.max_amount);
        console.log(r.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (


    <Container fluid>
      <Row className="justify-content-center align-items-center">
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Auto-Bidding</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdateMaxAmount}>
                <Row>
                  <Col>
                    <Form.Group>
                      <label>Max Amount</label>
                      <Form.Control
                        placeholder="Maximum amount"
                        type="number"
                        name="max_amount"
                        value={maxAmount}
                        required
                        onChange={onChangeAmount}

                      ></Form.Control>
                    </Form.Group>
                  </Col>

                </Row>

                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                >
                  Submit
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default AutoBiddingSettings;
