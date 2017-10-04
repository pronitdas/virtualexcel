import React, { Component } from 'react';
import './App.css';
import VirtualGrid from "./components/MultiGrid/VirtualGrid";
import { Row , Col, Grid } from 'react-bootstrap';
import * as _ from 'lodash';

const defaultOptions = {
    headerColor:"#79a1ce",
    primaryColor:"whitesmoke",
    secondaryColor:"#d9e8ff",
    headerFontSize:"18px",
    cellFontSize:"16px",
    columnWidth:100,
    componentHeight:1000,
    width:1400,
};


const defaultData = require("./data.json");

class App extends Component {

  constructor(props){
      let columnKeys =  props.data ? _.keysIn(props.data[0]) :  _.keysIn(defaultData[0]);
      super(props);
      this.state = {
          primaryColor:props.options.primaryColor || defaultOptions.primaryColor,
          secondaryColor:props.options.secondaryColor || defaultOptions.secondaryColor,
          lockedRowIndices:[0,],
          lockedColumnIndices:[],
          headerColor:props.options.headerColor || defaultOptions.headerColor,
          columnWidth:props.options.columnWidth || defaultOptions.columnWidth,
          componentHeight: props.options.componentHeight || defaultOptions.componentHeight,
          headerFontSize:props.options.headerFontSize || defaultOptions.headerFontSize,
          cellFontSize:props.options.cellFontSize || defaultOptions.cellFontSize,
          width:props.options.width || defaultOptions.width,
          data:props.options.data || defaultData,
          columnKeys: columnKeys
      };
      this.handlePrimaryColorChange = this.handlePrimaryColorChange.bind(this);
      this.handleHeaderColorChange = this.handleHeaderColorChange.bind(this);
      this.handleSecondaryColorChange = this.handleSecondaryColorChange.bind(this);
  }


    handlePrimaryColorChange(color){
        console.log(color);
        this.setState({primaryColor:color.hex});
    }

    handleHeaderColorChange(color){
        console.log(color);
        this.setState({headerColor:color.hex});
    }
    handleSecondaryColorChange(color){
        this.setState({secondaryColor:color.hex});
    }

    componentDidUpdate(){
        console.log(
            document.getElementById("vgrid").getBoundingClientRect);
    }


  render() {
      const { primaryColor, data , columnKeys, width,secondaryColor, headerFontSize,cellFontSize, lockedRowIndices, componentHeight, lockedColumnIndices, headerColor, columnWidth} = this.state;

      return (
          <Grid>
              <Row className="show-grid">
                  <Col xs={6} md={10} sm={10}>
                      <div id="vgrid" className="p-r-50 p-l-50">
                          {data &&
                              <VirtualGrid
                                  headerColor={headerColor}
                                  primaryColor={primaryColor}
                                  secondaryColor={secondaryColor}
                                  lockedColumnIndices={lockedColumnIndices}
                                  lockedRowIndices={lockedRowIndices}
                                  columnWidth={columnWidth}
                                  componentHeight={componentHeight}
                                  headerFontSize={headerFontSize}
                                  cellFontSize={cellFontSize}
                                  width={width}
                                  data={data}
                                  columnKeys={columnKeys}
                              />
                          }
                      </div>
                  </Col>
              </Row>
          </Grid>
      );
  }
}

export default App;
