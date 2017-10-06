import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';
import './App.css';
import './components/MultiGrid/MultiGrid.example.css';
import Layout from './components/Layout';
import App from "./App";


let data = require("./data.json");

let options = {
    headerColor:"#79A1CE", // set header color
    primaryColor:"#F5F5F5", // set primary row color
    secondaryColor:"#D9E8FF", // set secondary row color
    headerFontSize:"18px", // set header font size
    cellFontSize:"16px", // set cell font size
    // componentHeight:1200, // set component heigth
    componentWidth:1400, // set component width
    element:"root", // set the mounting element
    minColumnWidth:50, // set the min column width
    maxColumnWidth:250, // set the max column width
    minRowHeight:50, // set the min row height
    maxRowHeight:100, // set the max row height
    maxRowCount:15, // set the max column count
    maxColCount:10, // set the max column count
    data:data, // set the data source
    render:"demoLayout" //// with layout "demoLayout" without layout "app"
};

let element = options.element && options.element.length>0 ? document.getElementById(options.element) : document.getElementById('root');

//

if(options.render === "app"){
    ReactDOM.render(<App options={options}/>, element);
}

if(options.render ==="demoLayout"){
    ReactDOM.render(<Layout options={options}/>, element);
}



