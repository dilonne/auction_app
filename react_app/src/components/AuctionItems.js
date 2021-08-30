import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import AuctionItemService from "../services/auction_item_service";

const AuctionItems = () => {

  const [auction_items, setAuctionItems] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");


  useEffect(() => {
    fetchData()
  }, []);


  const fetchData = () => {
    AuctionItemService.getAll()
      .then(response => {
        setAuctionItems(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const items = auction_items.map(item => {
    return (

      <Card  key={item.id}>
        <Card.Header>
          <Card.Title>      
            <Link to={`/auction_items/${item.id}`}>{item.antique.name}</Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
            <dl class="row">
              <dt class="col-sm-3">Description</dt>
              <dd class="col-sm-9">{item.antique.description}</dd>
              <dt class="col-sm-3">Price</dt>
              <dd class="col-sm-9">{item.base_price}</dd>
            </dl>
        </Card.Body>
      </Card>


    );
  });

  return (
    <>
      <h1>Auction Catalogue</h1>
      {items}
    </>
  );
};

export default AuctionItems;
