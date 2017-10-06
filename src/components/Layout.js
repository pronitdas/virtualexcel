import React , {Component} from 'react';

import App from '../App';

import { Row , Col, Grid } from 'react-bootstrap';
import Header from "./Header";
const dropdownItems = [
    {href: '#', name: 'Overview'},
    {href: '#', name: 'Setup'},
    {href: '#', name: 'Usage'},
];

class Layout extends Component{

    render(){
      return (
          <div>
              <Header/>
              <div className="wrap">
                  <Grid>
                      <Row className="show-grid">
                          <Col xs={6} md={12} sm={12}>
                              <App {...this.props}/>
                          </Col>
                      </Row>
                  </Grid>
                  <div className="push" />
              </div>
              <div className="footer fixed-bottom">
                          <span style={{"fontSize":"14px","color":"#FFFF"}}>
                                Copyright @Arkenea Technologies (2017)
                          </span>
              </div>
          </div>);
    }
}

export default Layout;