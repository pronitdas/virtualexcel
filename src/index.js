import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const data = require("./data.json");

const options = {
    headerColor:"#79a1ce",
    primaryColor:"white",
    secondaryColor:"#d9e8ff",
    headerFontSize:"18px",
    cellFontSize:"16px",
    columnWidth:100,
    componentHeight:1000,
    width:1400,
    data:data,
};

ReactDOM.render(<App options={options} />, document.getElementById('root'));