import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"


// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    Table,

} from "react-bootstrap";


import AuctionItemService from "../services/auction_item_service";
import BidService from "../services/bid_service";


function AuctionItemDetail() {

    const initialAuctionItemState = {
        id: null,
        base_price: null,
        current_price: null,
        antique: null,
        auction: null,
        bids: [],
    };
    const [currentAuctionItem, setCurrentAuctionItem] = useState(initialAuctionItemState);
    const [message, setMessage] = useState("");
    const [placedBid, setPlacedBid] = useState(false);
    const [price, setPrice] = useState(0);
    const [auto_bidding, setAutoBidding] = useState(false);


    const onChangePrice = (e) => {
        const price = e.target.value;
        console.log(price)
        setPrice(price);
    };

    const onChangeAutoBidding = (e) => {
        const ab = e.target.checked;
        setAutoBidding(ab);
    };



    const fetchData = id => {
        AuctionItemService.get(id)
            .then(response => {
                setCurrentAuctionItem(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handlePlaceBid = (e) => {
        e.preventDefault();
        BidService.bid(currentAuctionItem.id, price, auto_bidding)
            .then(response => {
                console.log(response.data);
                setPlacedBid(true)
                setMessage("Successfully placed bid");
            })
            .catch(e => {
                console.log(e.response.data);
                const errorMessage =
                    (e.response.data.detail ||
                        e.response.data.price[0]
                    )
                setMessage(errorMessage)


            });
    }


    const { itemId } = useParams()

    useEffect(() => {
        fetchData(itemId);
    }, [itemId]);





    return (

        <Container fluid>

            <Row>
                <Col md="8">
                    <Row>
                        <Col>
                            <Card className="card-tasks">
                                <Card.Header>
                                    <p className="card-category">Auction Details</p>
                                </Card.Header>
                                <Card.Body>
                                    {currentAuctionItem.auction ? (
                                        <dl class="row">
                                            <dt class="col-sm-3">Start Date</dt>
                                            <dd class="col-sm-9">
                                                {currentAuctionItem.auction.start_date}
                                            </dd>

                                            <dt class="col-sm-3">End Date</dt>
                                            <dd class="col-sm-9">
                                                {currentAuctionItem.auction.end_date}
                                            </dd>

                                            <dt class="col-sm-3">Time Remaining</dt>
                                            <dd class="col-sm-9">
                                                {currentAuctionItem.auction.remaining_time}
                                            </dd>

                                        </dl>

                                    ) : (
                                        <div>

                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card className="card-tasks">
                                <Card.Header>
                                    <p className="card-category">Auction Item Details</p>
                                </Card.Header>
                                <Card.Body>
                                    {currentAuctionItem.antique ? (
                                        <dl class="row">
                                            <dt class="col-sm-3">Name</dt>
                                            <dd class="col-sm-9">
                                                {currentAuctionItem.antique.name}
                                            </dd>

                                            <dt class="col-sm-3">Description</dt>
                                            <dd class="col-sm-9">
                                                {currentAuctionItem.antique.description}
                                            </dd>

                                        </dl>

                                    ) : (
                                        <div>

                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Row className="no-gutters">
                                <Col md="8">
                                    <Card className="card-tasks">
                                        <Card.Header>
                                            <p className="card-category">Bid Details</p>
                                        </Card.Header>
                                        <Card.Body>
                                            {currentAuctionItem ? (
                                                <dl class="row">
                                                    <dt class="col-sm-3">Base Price</dt>
                                                    <dd class="col-sm-9">${currentAuctionItem.base_price}</dd>
                                                    <dt class="col-sm-3">Current Price</dt>
                                                    <dd class="col-sm-9">{currentAuctionItem.current_price}</dd>
                                                </dl>
                                            ) : (
                                                <div>

                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col>
                                    <Card className="card-tasks">
                                        <Card.Body>
                                            <Form onSubmit={handlePlaceBid}>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter Price"
                                                        name="price"
                                                        value={price}
                                                        onChange={onChangePrice}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Auto-bidding"
                                                        name="auto_bidding"
                                                        onChange={onChangeAutoBidding}
                                                    />
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Place Bid
                                                </Button>
                                            </Form>

                                            {placedBid ? (
                                                <div className="form-group">
                                                    <div className="alert alert-success" role="alert">
                                                        {message}
                                                    </div>
                                                </div>
                                            ) : (
                                                message && (
                                                    <div className="form-group">
                                                        <div className="alert alert-danger" role="alert">
                                                            {message}
                                                        </div>
                                                    </div>)
                                            )}
                                        </Card.Body>
                                    </Card>

                                </Col>
                            </Row>

                        </Col>

                    </Row>
                </Col>
                <Col md="4">
                    {currentAuctionItem.bids ? (
                        <Card className="card-tasks">
                            <Card.Header>
                                <Card.Title as="h4">Bid History</Card.Title>
                                <p className="card-category">Recent placed bids</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-full-width">
                                    <Table>
                                        <tbody>
                                            <div>
                                                <div className="table-full-width">
                                                    <table>
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th scope="col">Price</th>
                                                                <th scope="col">Date</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {currentAuctionItem.bids.map(bid => (
                                                                <tr key={bid.id}>
                                                                    <td>
                                                                        $ {bid.price}
                                                                    </td>
                                                                    <td>
                                                                        {bid.date_placed}
                                                                    </td>
                                                                </tr>

                                                            ))}

                                                        </tbody>

                                                    </table>


                                                </div>

                                            </div>


                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>

                        </Card>) : (
                        <div>

                        </div>
                    )}
                </Col>
            </Row>

        </Container>


    )
}

export default AuctionItemDetail