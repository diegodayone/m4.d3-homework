import React from "react";
import { ListGroup, ListGroupItem, Spinner, Input, Button } from "reactstrap";

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      rate: 1
    };
  }

  submitComment = async () => {
    var myNewComment = {
      //Creating the body of my request
      comment: this.state.comment,
      rate: this.state.rate,
      elementId: this.props.book.asin
    };

    var response = await fetch("http://strive-school-testing-apis.herokuapp.com/api/comments/", {
      method: "POST",
      headers: {
        Authorization: "Basic dXNlcjc6M1VVNWRZRnZlblJ1UlA3RQ==",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myNewComment)
    });

    var newItem = await response.json();
    console.log(newItem);

    this.props.handleNewComment(newItem);
  };

  render() {
    return (
      <>
        {this.props.book && (
          <>
            <h2>Comments for {this.props.book.title}</h2>
            <div className="container">
              <div className="row">
                <Input
                  type="text"
                  className="col-md-4"
                  placeholder="Comment"
                  value={this.state.comment}
                  onChange={com => this.setState({ comment: com.currentTarget.value })}
                />
                <Input
                  type="number"
                  className="col-md-4"
                  min="0"
                  max="5"
                  placeholder="Rating"
                  value={this.state.rate}
                  onChange={com => this.setState({ rate: com.currentTarget.value })}
                />

                <Button className="col-md-2" onClick={this.submitComment}>
                  Submit
                </Button>
              </div>
            </div>
          </>
        )}
        {this.props.isLoading && (
          <div>
            Comments are loading
            <Spinner color="primary" />
          </div>
        )}
        {!this.props.isLoading && (
          <>
            {this.props.comments && this.props.comments.length === 0 && <h3>No comments</h3>}
            {this.props.comments && this.props.comments.length > 0 && (
              <ListGroup>
                {this.props.comments &&
                  this.props.comments.map(comment => (
                    <ListGroupItem key={comment._id}>
                      {comment.author} : {comment.comment} | {comment.rate}/5
                    </ListGroupItem>
                  ))}
              </ListGroup>
            )}
          </>
        )}
      </>
    );
  }
}

export default Comments;
