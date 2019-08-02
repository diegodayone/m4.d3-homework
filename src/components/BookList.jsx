import React from "react";
import SingleBook from "./SingleBook";

class BookList extends React.Component {
  state = {};
  render() {
    var books = this.props.books.map(book => (
      <div key={book.asin} className="col-md-3">
        <SingleBook book={book} onBookClicked={this.props.onBookClicked} />
      </div>
    ));

    return (
      <div className="container">
        <div className="row krysz">{books}</div>
      </div>
    );
  }
}

export default BookList;
