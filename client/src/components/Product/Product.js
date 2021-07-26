import React, { Component } from "react";

import { connect } from "react-redux";
import { saveBook, fetchBook, updateBook, fetchLanguages, fetchGenres } from "../../services/index";

import { Card, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlusSquare, faUndo, faList, faEdit } from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      genres: [],
      languages: [],
      show: false,
    };
  }

  initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoURL: "",
    isbnNumber: "",
    price: "",
  };

  componentDidMount() {
    const bookId = +this.props.match.params.id;
    if (bookId) {
      this.findBookById(bookId);
    }
    //this.findAllLanguages();
  }

  findAllLanguages = () => {
    this.props.fetchLanguages();
    setTimeout(() => {
      let bookLanguages = this.props.bookObject.languages;
      if (bookLanguages) {
        this.setState({
          languages: [{ value: "", display: "Select Language" }].concat(
            bookLanguages.map(language => {
              return { value: language, display: language };
            })
          ),
        });
        this.findAllGenres();
      }
    }, 100);
  };

  findAllGenres = () => {
    this.props.fetchGenres();
    setTimeout(() => {
      let bookGenres = this.props.bookObject.genres;
      if (bookGenres) {
        this.setState({
          genres: [{ value: "", display: "Select Genre" }].concat(
            bookGenres.map(genre => {
              return { value: genre, display: genre };
            })
          ),
        });
      }
    }, 100);
  };

  findBookById = bookId => {
    this.props.fetchBook(bookId);
    setTimeout(() => {
      let book = this.props.bookObject.book;
      if (book != null) {
        this.setState({
          id: book.id,
          title: book.title,
          author: book.author,
          coverPhotoURL: book.coverPhotoURL,
          isbnNumber: book.isbnNumber,
          price: book.price,
          language: book.language,
          genre: book.genre,
        });
      }
    }, 1000);
  };

  resetBook = () => {
    this.setState(() => this.initialState);
  };

  submitBook = event => {
    event.preventDefault();

    const book = {
      category: {
        icon: "string",
        id: 0,
        name: "string",
        productList: [null],
      },
      content: "string",
      createdDate: "2021-07-26T04:35:30.174Z",
      id: 0,
      name: "string",
      photo: ["string"],
      user: {
        email: "string",
        enabled: true,
        password: "string",
        productList: [null],
        userId: 0,
        userProfile: {
          address: "string",
          id: 0,
          phoneNumber: "string",
          profile_photo: "string",
          ratings: 0,
          username: "string",
        },
      },
    };
    // title: this.state.title,
    // author: this.state.author,
    // coverPhotoURL: this.state.coverPhotoURL,
    // isbnNumber: this.state.isbnNumber,
    // price: this.state.price,
    // };

    this.props.saveBook(book);
    setTimeout(() => {
      if (this.props.bookObject.book != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateBook = event => {
    event.preventDefault();

    const book = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      language: this.state.language,
      genre: this.state.genre,
    };
    this.props.updateBook(book);
    setTimeout(() => {
      if (this.props.bookObject.book != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  bookChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  bookList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { title, author, coverPhotoURL, price } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast show={this.state.show} message={this.state.method === "put" ? "Product Updated Successfully." : "Product Saved Successfully."} type={"success"} />
        </div>
        <Card className={"border border-light bg-light text-dark"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Product" : "Add New Product"}
          </Card.Header>
          <Form onReset={this.resetBook} onSubmit={this.state.id ? this.updateBook : this.submitBook} id="bookFormId">
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="title"
                    value={title}
                    onChange={this.bookChange}
                    className={"bg-light text-dark"}
                    placeholder="Enter Product Title"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="author"
                    value={author}
                    onChange={this.bookChange}
                    className={"bg-light text-dark"}
                    placeholder="Enter Product Author"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                  <Form.Label>Cover Photo URL</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="coverPhotoURL"
                      value={coverPhotoURL}
                      onChange={this.bookChange}
                      className={"bg-light text-dark"}
                      placeholder="Enter Product Cover Photo URL"
                    />
                    <InputGroup.Append>
                      {this.state.coverPhotoURL !== "" && <Image src={this.state.coverPhotoURL} roundedRight width="40" height="38" />}
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="price"
                    value={price}
                    onChange={this.bookChange}
                    className={"bg-light text-dark"}
                    placeholder="Enter Product Price"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLanguage">
                  <Form.Label>L</Form.Label>
                  {/* <Form.Control required as="select" custom onChange={this.bookChange} name="language" value={language} className={"bg-light text-dark"}>
                    {this.state.languages.map(language => (
                      <option key={language.value} value={language.value}>
                        {language.display}
                      </option>
                    ))}
                  </Form.Control> */}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridGenre">
                  <Form.Label>G</Form.Label>
                  {/* <Form.Control required as="select" custom onChange={this.bookChange} name="genre" value={genre} className={"bg-light text-dark"}>
                    {this.state.genres.map(genre => (
                      <option key={genre.value} value={genre.value}>
                        {genre.display}
                      </option>
                    ))}
                  </Form.Control> */}
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button size="sm" variant="info" type="button" onClick={() => this.bookList()}>
                <FontAwesomeIcon icon={faList} /> Book List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookObject: state.book,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveBook: book => dispatch(saveBook(book)),
    fetchBook: bookId => dispatch(fetchBook(bookId)),
    updateBook: book => dispatch(updateBook(book)),
    fetchLanguages: () => dispatch(fetchLanguages()),
    fetchGenres: () => dispatch(fetchGenres()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);