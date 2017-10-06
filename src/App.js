import React, { Component } from 'react';
import './App.css';
import VirtualGrid from "./components/MultiGrid/VirtualGrid";
import * as _ from 'lodash';
import './styles.css';
const defaultOptions = {
    headerColor:"",
    primaryColor:"#f5f5f5",
    secondaryColor:"#d9e8ff",
    headerFontSize:"18px",
    cellFontSize:"16px",
    columnWidth:100,
    componentHeight:1500,
    width:1400,
    minColumnWidth:100,
    maxColumnWidth:250,
    minRowHeight:50,
    maxRowHeight:100,
    maxRowCount:15,
    maxColCount:10,
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
          lockedRowIndices:[],
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
        this.setDefaultWidth();
        this.calculateHeightAndWidth();
    }


    setDefaultWidth(){
        const {columnKeys} = this.state;
        let colWidths = _.map(columnKeys ,()=>{
            return 0;
        });

        this.setState({colWidths});
    }

    handlePrimaryColorChange(color){
        this.setState({primaryColor:color.hex});
    }

    handleHeaderColorChange(color){
        this.setState({headerColor:color.hex});
    }
    handleSecondaryColorChange(color){
        this.setState({secondaryColor:color.hex});
    }

    onResize(data,columnIndex) {
        const {colWidths ,columnWidth,lockedColumnIndices} = this.state;
        let colWidth = _.cloneDeep(colWidths);
        if(lockedColumnIndices.length ===0) {
            colWidth[columnIndex] = data.width;
            this.setState({colWidths:colWidth});
            this.setState({count:this.state.count+1});
        }

    };


    freezeRow(rowId){
        let { lockedRowIndices } = this.state;
        if(_.includes(lockedRowIndices , rowId)){
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
            this.setState({lockedColumnIndices});
        } else {
            lockedColumnIndices.push(keyId);
            this.setState({lockedColumnIndices});
        }
        lockedColumnKeys = _.map(lockedColumnIndices , (a) => columnKeys[a]);

        if(lockedColumnIndices.length > 0){
            this.setDefaultWidth();
        }

        this.setState({count:this.state.count+1,lockedColumnKeys});
    }

  calculateHeightAndWidth(){
        let {options: {minColumnWidth,componentHeight,componentWidth,maxColumnWidth,minRowHeight,maxRowHeight,maxRowCount,maxColCount}} = this.props;
        const {data} =this.state;
        minColumnWidth = minColumnWidth > 0 ? minColumnWidth : defaultOptions.minColumnWidth ;
        maxColumnWidth = maxColumnWidth > 0 ? maxColumnWidth : defaultOptions.maxColumnWidth ;
        minRowHeight = minRowHeight > 0 ? minRowHeight : defaultOptions.minRowHeight ;
        maxRowHeight = maxRowHeight > 0 ? maxRowHeight : defaultOptions.maxRowHeight ;
        maxRowCount = maxRowCount > 0 ? maxRowCount : defaultOptions.maxRowCount ;
        maxColCount = maxColCount > 0 ? maxColCount : defaultOptions.maxColCount ;


        if(componentHeight && maxRowCount){
            let rowHeight = maxRowCount < data.length  ? componentHeight / (maxRowCount+1) : componentHeight / (data.length+1)  ;
            rowHeight = (rowHeight > maxRowHeight) ? maxRowHeight : (rowHeight < minRowHeight) ? minRowHeight : rowHeight;

            this.setState({rowHeight});
        } else{
            componentHeight =  maxRowCount < data.length  ? 20 + (minRowHeight * (maxRowCount+1)) : 20 + (minRowHeight * (data.length+1)) ;
            this.setState({componentHeight});
        }
      let colCount = _.keysIn(data[0]).length;
      if(componentWidth && maxColCount){
          let columnWidth =colCount > maxColCount ? componentWidth/ (maxColCount+1) : componentWidth/ (colCount+1) ;
          columnWidth = (columnWidth > maxColumnWidth) ? maxRowHeight : (columnWidth < minColumnWidth) ? minColumnWidth : columnWidth;
          let suggestedWidth = columnWidth * (colCount+1) ;
          if(componentWidth > suggestedWidth){
              componentWidth = suggestedWidth;
              this.setState({componentWidth});
          }
          this.setState({columnWidth});
      } else{
          componentWidth = maxColCount < colCount ?  20 + (maxColumnWidth * (colCount+1)) : (minColumnWidth * (maxColCount+1));
          this.setState({componentWidth});
      }
    }

  render() {
      const { primaryColor, data, lockedColumnKeys,count, colWidths,columnKeys, componentWidth,secondaryColor,
          headerFontSize,cellFontSize, lockedRowIndices,rowHeight, componentHeight, lockedColumnIndices, headerColor, columnWidth

      } = this.state;

      return (
          <div id="vgrid" className="mx-auto" style={{maxHeight:componentHeight,maxWidth:componentWidth}}>
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

      );
  }
}

export default App;
