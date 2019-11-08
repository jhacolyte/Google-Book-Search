import React from "react";
import "./style.css";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import SaveBook from "../SaveBtn"
// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem({
  thumbnail = "https://placehold.it/300x300",
  title,
  author,
  description,
  href,
  key,
  handleBookSave,
  Button
}) {
  return (
  // <li className="list-group-item">{children}</li>
  <li className="list-group-item">
      <Container>
      {/* <SaveBook id={key} onClick={() => handleBookSave} type="button"/> */}
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumbnail} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3> 
            <Button />
            {/* <button onClick={handleBookSave} className={"btn btn-lg btn-info float-right"}>Save</button> */}
            <h6>By: {author}</h6>
            <p>{description}</p>
            <a rel="noreferrer noopener" target="_blank" href={href}>
              Go to Book!
            </a>
            {/* <a href={"/books/" + book.id}>Link</a> */}
          </Col>
        </Row>
      </Container>
    </li>
  
  );
}
