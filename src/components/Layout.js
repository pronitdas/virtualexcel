import React , {Component} from 'react';

import App from '../App';
import {Grid , Row, Navbar, Nav, Col, NavDropdown, MenuItem} from "react-bootstrap";

const dropdownItems = [
    {href: '#', name: 'Overview'},
    {href: '#', name: 'Setup'},
    {href: '#', name: 'Usage'},
];

class Layout extends Component{
    render(){
      return (<div>
            <NavbarInstance />
              <App />
              <Grid>
                  <hr />
                  <footer className="">
                      <p className="f-20 txt-primary p-t-20 v-middle">© Arkenea 2017</p>
                  </footer>
              </Grid>
          </div>
        );
    }
}

class NavbarInstance extends React.Component {
    render() {
        let brand = <a href='#'>Intellics</a>;
        return (
            <Navbar brand={brand} fixedTop>
                <Nav>
                    <Row className="show-grid">
                        <Col xs={12} md={8}><p className="f-20 p-l-20 v-middle f-left">Intellics </p></Col>
                        <Col xs={6} md={4}>
                            <p className="f-20 v-middle bg-color-box f-right">Source </p>
                            <p className="f-20 v-middle bg-color-box">Documentation </p>
                            <p className="f-20 v-middle bg-color-box">Demo </p>
                        </Col>
                    </Row>
                </Nav>
            </Navbar>
        );
    }
}

export default Layout;