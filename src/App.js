import React, { Component } from 'react';
import './App.css';
import VirtualGrid from "./components/MultiGrid/VirtualGrid";
import { Row , Col, Grid } from 'react-bootstrap';
import * as _ from 'lodash';
import './styles.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
const defaultOptions = {
    headerColor:"",
    primaryColor:"whitesmoke",
    secondaryColor:"#d9e8ff",
    headerFontSize:"18px",
    cellFontSize:"16px",
    columnWidth:100,
    componentHeight:1500,
    width:1400,
};
const defaultData = require("./data.json");
// externalized it

class App extends Component {

  constructor(props){
      let columnKeys = _.keysIn(defaultData[0]);
      super(props);
      this.state = {
          primaryColor:props.options.primaryColor || defaultOptions.primaryColor,
          secondaryColor:props.options.secondaryColor || defaultOptions.secondaryColor,
          lockedRowIndices:[0],
          lockedColumnIndices:[],
          headerColor:props.options.headerColor || defaultOptions.headerColor,
          columnWidth:props.options.columnWidth || defaultOptions.columnWidth,
          componentHeight: props.options.componentHeight || defaultOptions.componentHeight,
          headerFontSize:props.options.headerFontSize || defaultOptions.headerFontSize,
          cellFontSize:props.options.cellFontSize || defaultOptions.cellFontSize,
          componentWidth:props.options.componentWidth || defaultOptions.componentWidth,
          data:props.options.data,
          columnKeys: columnKeys,
          colWidths:[],
          count:1,
          rowHeight:props.options.minRowHeight || defaultOptions.minRowHeight,
          lockedColumnKeys:[]
      };
      this.handlePrimaryColorChange = this.handlePrimaryColorChange.bind(this);
      this.handleHeaderColorChange = this.handleHeaderColorChange.bind(this);
      this.handleSecondaryColorChange = this.handleSecondaryColorChange.bind(this);
      this.onResize= this.onResize.bind(this);
      this.freezeRow = this.freezeRow.bind(this);
      this.freezeColumn = this.freezeColumn.bind(this);
  }
    componentWillMount(){
        const {columnKeys} = this.state;
            console.log("this.props" ,this.props);
            let colWidths = _.map(columnKeys ,()=>{
                return 150;
            });

            colWidths[1]=170;
            console.log(colWidths);
            this.setState({colWidths});
        this.calculateHeightAndWidth();
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

    onResize(event,data,columnIndex) {
        console.log(data.size.width);
        const {colWidths} = this.state;
        colWidths[columnIndex] = data.size.width;
        this.setState({colWidths});
    };
    freezeRow(rowId){
        let { lockedRowIndices } = this.state;
        if(_.includes(lockedRowIndices , rowId)){
            console.log(rowId);
            lockedRowIndices = _.remove(lockedRowIndices,(a)=> a!==rowId);
            this.setState({lockedRowIndices});
        } else {
            lockedRowIndices.push(rowId);
            this.setState({lockedRowIndices});
        }

        this.setState({count:this.state.count+1});
    }

    freezeColumn(id){
        let { lockedColumnIndices,columnKeys } = this.state;
        let colId = _.split(id , ",")[0];
        let colKey = _.split(id, ",")[1];
        let keyId = _.indexOf(columnKeys , colKey);
        let keyIndex = _.indexOf(lockedColumnIndices , keyId);
        let lockedColumnKeys = _.map(lockedColumnIndices , (a) => columnKeys[a]);
        /// check if key is already if it is there remove it from freeze
        if(_.includes(lockedColumnKeys , colKey)){
            if(lockedColumnIndices.length > 1) {
                lockedColumnIndices.splice(keyIndex , 1);
            } else {
                lockedColumnIndices =[];
            }
            console.log("after splice" , lockedColumnIndices);
            this.setState({lockedColumnIndices});
        } else {
            lockedColumnIndices.push(keyId);
            this.setState({lockedColumnIndices});
        }
        lockedColumnKeys = _.map(lockedColumnIndices , (a) => columnKeys[a]);

        this.setState({count:this.state.count+1,lockedColumnKeys});
    }

  calculateHeightAndWidth(){
        let {options: {minColumnWidth,componentHeight,componentWidth,maxColumnWidth,minRowHeight,maxRowHeight,maxRowCount,maxColCount}} = this.props;
        const {data} =this.state;

        console.log("minColumnWidth,componentHeight,componentWidth,maxColumnWidth,minRowHeight,maxRowHeight,maxRowCount,maxColCount",minColumnWidth,componentHeight,componentWidth,maxColumnWidth,minRowHeight,maxRowHeight,maxRowCount,maxColCount);
        if(componentHeight && maxRowCount){
            let rowHeight = maxRowCount < data.length  ? componentHeight / (maxRowCount+1) : componentHeight / (data.length+1)  ;
            rowHeight = (rowHeight > maxRowHeight) ? maxRowHeight : (rowHeight < minRowHeight) ? minRowHeight : rowHeight;

            console.log("rowHeight" , rowHeight);
            this.setState({rowHeight});
        } else{
            componentHeight =  maxRowCount < data.length  ? 20 + (minRowHeight * (maxRowCount+1)) : 20 + (minRowHeight * (data.length+1)) ;
            console.log("compHeight",componentHeight);
            this.setState({componentHeight});
        }

      if(componentWidth && maxColCount){
          let columnWidth = componentWidth/ (maxColCount+1);
          columnWidth = (columnWidth > maxColumnWidth) ? maxRowHeight : (columnWidth < minColumnWidth) ? minColumnWidth : columnWidth;
          console.log("colWidth",columnWidth);
          this.setState({columnWidth});

      }
      else{
          let colCount = _.keysIn(data[0]).length;
          componentWidth = maxColCount < colCount ?  20 + (minColumnWidth * (maxColCount+1)) : (minColumnWidth * (colCount+1));
          this.setState({componentWidth});
          console.log("comp Width",componentWidth);
      }


  }

  render() {
      const { primaryColor, data, lockedColumnKeys,count, colWidths,columnKeys, componentWidth,secondaryColor,
          headerFontSize,cellFontSize, lockedRowIndices,rowHeight, componentHeight, lockedColumnIndices, headerColor, columnWidth} = this.state;



      return (
          <div>
              <Header/>
              <div>
                  <Grid>
                      <Row className="show-grid">
                          <Col xs={6} md={11} sm={11}>
                              <div id="vgrid" style={{maxWidth:componentWidth}}>
                                  {data  && colWidths &&
                                      <VirtualGrid
                                          headerColor={headerColor}
                                          primaryColor={primaryColor}
                                          secondaryColor={secondaryColor}
                                          lockedColumnIndices={lockedColumnIndices}
                                          lockedRowIndices={lockedRowIndices}
                                          columnWidth={columnWidth}
                                          componentHeight={componentHeight}
                                          rowHeight={rowHeight}
                                          headerFontSize={headerFontSize}
                                          cellFontSize={cellFontSize}
                                          componentWidth={componentWidth}
                                          data={data}
                                          columnKeys={columnKeys}
                                          handleColResize={this.onResize}
                                          colWidth={colWidths}
                                          onFreezeColHandle={this.freezeColumn}
                                          onFreezeRowHandle={this.freezeRow}
                                          key={count}
                                          lockedColumnKeys={lockedColumnKeys}
                                      />
                                  }
                              </div>
                          </Col>
                      </Row>
                  </Grid>
              </div>
              <footer class="footer">
                  <div class="container">
                      <span style={{"fontSize":"14px","color":"#FFFF"}}>
                            Copyright @Arkenea Technologies (2017)
                        </span>
                  </div>
              </footer>
      </div>
      );
  }
}

export default App;
