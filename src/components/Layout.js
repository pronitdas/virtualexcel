import React , {Component} from 'react';

import App from '../App';
import {Grid , Row} from "react-bootstrap";

const dropdownItems = [
    {href: '#', name: 'Overview'},
    {href: '#', name: 'Setup'},
    {href: '#', name: 'Usage'},
];


class Layout extends Component{




    render(){
      return (<Grid>
            <Row className="show-grid">
                <div style={{height: "200px"}}>

                </div>
            </Row>
            <App />
        </Grid>);
    }
}

export default Layout;