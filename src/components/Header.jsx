import React , {Component} from 'react';

import "../styles.css";
import * as  logo from "../images/logo.png";

class Header extends Component {
    menuNav() {
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    render(){
        return(
            <div>
                {/*<nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="http://intelitics.com"><img src={logo} alt="Intelitics"/>
                            </a>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="sideNav">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div id="sideNav" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><a>Home</a></li>
                                <li><a>About</a></li>
                                <li><a>Contact</a></li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown </a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a>Action</a></li>
                                        <li><a>Another action</a></li>
                                        <li><a>Something else here</a></li>
                                        <li className="divider"></li>
                                        <li className="dropdown-header">Nav header</li>
                                        <li><a>Separated link</a></li>
                                        <li><a>One more separated link</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>*/}
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="http://intelitics.com"><img src={logo} alt="Intelitics"/>
                            </a>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#sideBar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div id="sideBar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-bar-chart fl-left" style={{"color":"darkcyan"}} aria-hidden="true"></i>
                                        Reports <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a>Detailed</a></li>
                                        <li><a>Affiliate</a></li>
                                        <li><a>Advertiser</a></li>
                                        <li><a>Brand</a></li>
                                        <li><a>Offer</a></li>
                                        <li><a>Creative</a></li>
                                        <li><a>Clawback</a></li>
                                        <li><a>Download</a></li>
                                        <li><a>Test Offer</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench fl-left" style={{"color":"darkcyan"}} aria-hidden="true"></i>
                                         Tech <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a>Detailed</a></li>
                                        <li><a>Affiliate</a></li>
                                        <li><a>Advertiser</a></li>
                                        <li><a>Brand</a></li>
                                        <li><a>Offer</a></li>
                                        <li><a>Creative</a></li>
                                        <li><a>Clawback</a></li>
                                        <li><a>Download</a></li>
                                        <li><a>Test Offer</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-th fl-left" style={{"color":"darkcyan"}} aria-hidden="true"></i> Account <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a>Detailed</a></li>
                                        <li><a>Affiliate</a></li>
                                        <li><a>Advertiser</a></li>
                                        <li><a>Brand</a></li>
                                        <li><a>Offer</a></li>
                                        <li><a>Creative</a></li>
                                        <li><a>Clawback</a></li>
                                        <li><a>Download</a></li>
                                        <li><a>Test Offer</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

}
export default Header;