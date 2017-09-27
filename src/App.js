import React, { Component } from 'react';
import './App.css';
import VirtualGrid from "./components/MultiGrid/VirtualGrid";
import { Row , Col } from 'react-bootstrap';

class App extends Component {
  render() {
      return (

              <Row className="show-grid">
                  <Col xs={8} md={8}>
                      <div className="m-t-50 ">
                          <VirtualGrid />
                      </div>

                  </Col>
              </Row>

      );
  }
}

export default App;
