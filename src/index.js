import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './components/Layout';
import registerServiceWorker from './registerServiceWorker';

let data= require("./data.json");
let options = {
    headerColor:"#CACFD2", // set header color
    primaryColor:"#B2BABB", // set primary row color
    secondaryColor:"#AED6F1", // set secondary row color
    headerFontSize:"18px", // set header font size
    cellFontSize:"16px", // set cell font size
    // componentHeight:1200, // set component heigth
    // componentWidth:1400, // set component width
    element:"root", // set the mounting element
    minColumnWidth:100, // set the min column width
    maxColumnWidth:250, // set the max column width
    minRowHeight:50, // set the min row height
    maxRowHeight:100, // set the max row height
    maxRowCount:15, // set the max column count
    maxColCount:10, // set the max column count
    data:data // set the data source
};

let element = options.element && options.element.length>0 ? document.getElementById(options.element) : document.getElementById('root');


ReactDOM.render(<Layout options={options}/>, element);
// ReactDOM.render(<App options={options}/>, element);
registerServiceWorker();
