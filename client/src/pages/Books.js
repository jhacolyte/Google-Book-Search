import React, { Component } from "react";
import axios from "axios";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    searchResults: [],
    title: "",
    author: "",
    synopsis: "",
    searchTerm: "cat"
  };

  /* 
  1. hit api and get the JSON
  2. loop through data pullingout tile, author, and description
  3. append each book to 'searchResults' in state
  4. load books from state and display
  */

  //this.handleSearchButton = this.handleSearchButton.bind(this);

  componentDidMount() {
    this.loadBooks();
    this.handleSearchButton();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSearchButton = () => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchTerm)
      .then(results => {
        let bookResults = results.data.items;
        let bookArray = [];

        bookResults.forEach(item => {
          if (item.volumeInfo.title && item.volumeInfo.authors && item.volumeInfo.description) {
            
            let authors = "";
            item.volumeInfo.authors.forEach(author => authors += author + " ") 
            
            let book = {
              title: item.volumeInfo.title,
              author: authors,
              synopsis: item.volumeInfo.description
            };
            bookArray.push(book);
          }
        });
        console.log(bookArray);
        this.setState({searchResults: bookArray});
      }).catch(err => console.log(err));
  };

  handleSaveBook = (event) => {
    let index = event.target.getAttribute('data-id');
    let bookToSave = this.state.searchResults[index];
    console.log(bookToSave);
    
    API.saveBook({ 
      title: this.state.searchResults[index].title,
      author: this.state.searchResults[index].author,
      synopsis: this.state.searchResults[index].synopsis
    })
    .then(res => this.loadBooks())
    .catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        
        <Row>
          <Col size="md-6">
            <Jumbotron><h1>Search Google Books</h1></Jumbotron>
            <Input  value={this.state.searchTerm}
                    onChange={this.handleInputChange}
                    placeholder="Search"
                    name="searchTerm" />
            <button onClick={this.handleSearchButton} >
                Submit
            </button>
            {this.state.searchResults.length > 0 ? (
              <List>
                {this.state.searchResults.map((book, index) => (
                  <ListItem key={index}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                    <button onClick={this.handleSaveBook} data-id={index} >
                      Save
                    </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>

          <Col size="md-6">
            <Jumbotron><h1>What Books Should I Read?</h1></Jumbotron>
            <form>
              <Input  value={this.state.title}
                      onChange={this.handleInputChange}
                      name="title"
                      placeholder="Title (required)" />
              <Input  value={this.state.author}
                      onChange={this.handleInputChange}
                      name="author"
                      placeholder="Author (required)" />
              <TextArea value={this.state.synopsis}
                        onChange={this.handleInputChange}
                        name="synopsis"
                        placeholder="Synopsis (Optional)" />
              <FormBtn  disabled={!(this.state.author && this.state.title)}
                        onClick={this.handleFormSubmit} >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          
          <Col size="md-6 sm-12">
            <Jumbotron><h1>Books On My List</h1></Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
