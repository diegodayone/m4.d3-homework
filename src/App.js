import React from 'react';
import './App.css';
import fantasyBooks from './data/fantasy.json';
import BookList from './components/BookList';
import SearchNav from './components/SearchNav';
import { Badge, Button } from "reactstrap"
import Comments from './components/Comments';

class App extends React.Component {

  constructor(params) {
    super(params)

    this.state = {
      filterValue: "",
      pageIndex: 0,
      selectedBook: null,
      isLoading: false
    }
  }

  search = (value) => { //ASSIGN THE STATE
    this.setState({ filterValue: value });
  }

  nextPage = () => {
    var pageIndex = this.state.pageIndex;
    this.setState({
      pageIndex: pageIndex + 20
    })
  }

  prevPage = () => {
    var pageIndex = this.state.pageIndex;
    this.setState({
      pageIndex: pageIndex - 20
    })
  }

  handleBookClick = async (book) => {
    book.price = 123;

    this.setState({ selectedBook: book, isLoading: true })

    var response = await fetch("http://strive-school-testing-apis.herokuapp.com/api/comments/" + book.asin, {
      headers: {
        "Authorization": "Basic dXNlcjc6M1VVNWRZRnZlblJ1UlA3RQ=="
      }
    });

    var comments = await response.json();
    this.setState({ comments: comments, isLoading: false });
  }

  handleNewComment = (comment) => {
    var comments = this.state.comments;
    comments.push(comment);
    this.setState({ comments: comments });
  }

  render() {
    return (
      <div className="App">

        <SearchNav handleSearch={this.search} ></SearchNav>
        {/* Filtering on the state value */}
        <Button onClick={this.prevPage} disabled={this.state.pageIndex === 0} >-</Button>
        <Badge color="primary" pill>{fantasyBooks.filter(book => book.title.includes(this.state.filterValue)).length}</Badge>
        <Badge color="success" pill>{this.state.pageIndex}</Badge>
        <Button onClick={this.nextPage} >+</Button>
        <BookList books={fantasyBooks
          .filter(book => book.title.includes(this.state.filterValue))
          .splice(this.state.pageIndex, 20)}
          onBookClicked={this.handleBookClick}
        />

        <Comments comments={this.state.comments} book={this.state.selectedBook} isLoading={this.state.isLoading}
          handleNewComment={this.handleNewComment} />
      </div>
    );
  }
}

export default App;
