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
      return (<App />);
    }
}

export default Layout;