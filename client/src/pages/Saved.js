import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Saved extends Component {
  state = {
    books: []
  };
  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    API.getSavedBook()
      .then(res => {
        console.log(res.data);
        this.setState({ books: res.data });
      })
      .catch(err => console.log(err));
  };

  handleBookDelete = id => {
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

  goHomePage = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                <button
                  onClick={this.goHomePage}
                  className="btn ml-2 btn-sm btn-info float-right"
                >
                  Go to Home
                </button>
                Titles on my List
              </h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem
                    //handleBookSave = {this.handleBookSave(book.id)}
                    key={book._id}
                    title={book.title}
                    author={book.authors}
                    description={book.description}
                    thumbnail={book.image}
                    href={book.link}
                    /* <SaveBtn /><a href={"/books/" + book.id}>Link</a> */
                    Button={() => (
                      <button
                        onClick={() => this.handleBookDelete(book._id)}
                        className="btn ml-2 btn-lg btn-danger float-right"
                      >
                        Delete Book
                      </button>
                    )}
                  ></ListItem>
                ))}
              </List>
            ) : (
              <h3 className="container">You Dont Have Any at this Moment</h3>
            )}
          </Col>
        </Row>
      </Container>
    ); // Return ends
  } // render method ends
} //Class ends

export default Saved;
