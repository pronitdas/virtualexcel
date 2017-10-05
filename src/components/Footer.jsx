import React , {Component} from 'react';

import "../styles.css";
import * as logo from "../images/logo.png";

class Footer extends Component {
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
            <div className="footer">
                <nav className="navbar navbar-inverse">
                    <div>
                        <span style={{"fontSize":"14px","color":"#ffffff"}}>
                            Copyright @Arkenea Technologies (2017)
                        </span>
                    </div>
                </nav>
            </div>
        );
    }

}
export default Footer;