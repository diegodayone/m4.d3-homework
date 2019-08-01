import React from 'react';
import logo from './logo.svg';
import './App.css';
import fantasyBooks from './data/fantasy.json';
import BookList from './components/BookList';
import SearchNav from './components/SearchNav';
import { Badge, Button } from "reactstrap"

class App extends React.Component {

  constructor(params) {
    super(params)

    this.state = {
      filterValue: "",
      pageIndex: 0
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
          .splice(this.state.pageIndex, 20)
        } />
      </div>
    );
  }
}

export default App;
