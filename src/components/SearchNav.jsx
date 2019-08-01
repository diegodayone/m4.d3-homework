import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse, Input } from "reactstrap";

class SearchNav extends React.Component {
  state = {};

  inputChange = input => {
    if (input.currentTarget.value.length > 3) {
      this.props.handleSearch(input.currentTarget.value);
    } else {
      this.props.handleSearch("");
    }
  };

  render() {
    return (
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          Strive Books
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Input type="text" className="col-md-3" placeholder="Search..." onChange={this.inputChange} />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default SearchNav;
