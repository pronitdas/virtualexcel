import React, { Component } from 'react';
import './App.css';
import VirtualGrid from "./components/MultiGrid/VirtualGrid";
import { Row , Col, Grid ,Panel, PageHeader} from 'react-bootstrap';
import {SketchPicker} from 'react-color';


const defaultColors = {
    headerColor:"#79a1ce",
    primaryColor:"whitesmoke",
    secondaryColor:"#d9e8ff",
    headerFontSize:"18px",
    cellFontSize:"16px"
};


class App extends Component {

  constructor(props){
      super(props);
      this.state = {
          primaryColor:null,
          secondaryColor:null,
          lockedRowIndices:[0],
          lockedColumnIndices:[],
          headerColor:null,
          columnWidth:100,
          componentHeight: 1200,
          headerFontSize:null,
          cellFontSize:null
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
        console.log(this.state);
    }


  render() {
      const { primaryColor, secondaryColor, headerFontSize,cellFontSize, lockedRowIndices, componentHeight, lockedColumnIndices, headerColor, columnWidth} = this.state;

      return (<Row className="show-grid">
                      <Col xs={8} md={8} sm={8}>
                          <div>
                              <VirtualGrid
                                  headerColor={headerColor || defaultColors.headerColor}
                                  primaryColor={primaryColor || defaultColors.primaryColor}
                                  secondaryColor={secondaryColor|| defaultColors.secondaryColor}
                                  lockedColumnIndices={lockedColumnIndices}
                                  lockedRowIndices={lockedRowIndices}
                                  columnWidth={columnWidth}
                                  componentHeight={componentHeight}
                                  headerFontSize={headerFontSize || defaultColors.headerFontSize}
                                  cellFontSize={cellFontSize || defaultColors.cellFontSize}
                              />
                          </div>
                      </Col>
                      <Col xsHidden md={4} sm={4} >
                          <div>
                              <Panel header="Settings" className="panel-info f-26 text-center">
                              <Col md={6}>
                                  <Panel header="Primary colorPicker" className="panel-primary f-20">
                                      <SketchPicker
                                          color={primaryColor || defaultColors.primaryColor}
                                          onChange={ this.handlePrimaryColorChange }
                                      />
                                  </Panel>


                                  <Panel header="Header colorPicker" className="panel-primary f-20">
                                      <SketchPicker
                                          color={headerColor || defaultColors.headerColor}
                                          onChange={ this.handleHeaderColorChange }
                                      />
                                  </Panel>
                                  <Panel header="Individual Row Height" className="panel-primary f-20">
                                      Panel content
                                  </Panel>


                              </Col>
                              <Col md={6} className="pull-right">

                                  <Panel header="secondary colorPicker" className="panel-primary f-20">
                                      <SketchPicker
                                          color={secondaryColor || defaultColors.secondaryColor}
                                          onChange={ this.handleSecondaryColorChange }
                                      />
                                  </Panel>
                                  <Panel header="Base Width" className="panel-primary f-20">
                                      Panel content
                                  </Panel>

                                  <Panel header="Component Height" className="panel-primary f-20">
                                      Panel content
                                  </Panel>
                                  <Panel header="Freezed Columns" className="panel-primary f-20">
                                      Panel content
                                  </Panel>
                                  <Panel header="Change Cell Font SiZe" className="panel-primary f-20">
                                      Panel content
                                  </Panel>
                                  <Panel header="Freezed Rows" className="panel-primary f-20">
                                      Panel content
                                  </Panel>

                                  <Panel header="Change Header Font SiZe" className="panel-primary f-20">
                                      Panel content
                                  </Panel>

                              </Col>
                              </Panel>

                          </div>
                      </Col>
                  </Row>
      );
  }
}

export default App;
