import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import SaveBtn from "../components/SaveBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn, BookBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    bookName: "",
    mongotableData: {}
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getBooks(this.state.bookName)
      .then(res => {
        console.log(res.data.items);
        this.setState({ books: res.data.items });
      })
      .catch(err => console.log(err));
  };

  handleBookSave = id => {
    //event.preventDefault();
    //this.setState({mongotableData:event.target.value})
    const book = this.state.books.find(book => book.id === id);

    // const {onClick, parent} = this.props
    //   console.log({onClick})
    //   console.log({parent})
    console.log({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    });
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => {
      alert("Book Saved");
    });
  };
  // loadBooks = (name) => {
  //   API.getBooks(name)
  //     .then(res => {
  //       console.log(res);
  //       this.setState({ books: res.data })
  //     })
  //     .catch(err => console.log(err));
  // };
  savedBook = () => {
    this.props.history.push("/saved");
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Looking for a Book?</h1>
            </Jumbotron>
            <form>
              <Input
                name="bookName"
                value={this.state.bookName}
                onChange={this.handleInputChange}
                placeholder="Title (required)"
              />
              <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
              {/* <BookBtn onClick = {this.savedBook}>Saved Book!!!</BookBtn> */}
              <button
                onClick={this.savedBook}
                className="btn ml-2 btn-md btn-info float-right"
              >
                Saved Books !!!
              </button>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Titles on my List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem
                    //handleBookSave = {this.handleBookSave(book.id)}
                    key={book.id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors}
                    description={book.volumeInfo.description}
                    thumbnail={book.volumeInfo.imageLinks.smallThumbnail}
                    href={book.volumeInfo.infoLink}
                    /* <SaveBtn /><a href={"/books/" + book.id}>Link</a> */
                    Button={() => (
                      <button
                        onClick={() => this.handleBookSave(book.id)}
                        className="btn ml-2 btn-lg btn-info float-right"
                      >
                        Save
                      </button>
                    )}
                  ></ListItem>
                ))}
              </List>
            ) : (
              <h3 className="container">No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
