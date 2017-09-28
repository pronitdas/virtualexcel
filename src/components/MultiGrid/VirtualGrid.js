import React, { Component } from 'react';
import {AutoSizer, CellMeasurer, CellMeasurerCache, MultiGrid} from 'react-virtualized';
import "./MultiGrid.example.css";
import * as _ from "lodash";

import { LabeledInput } from "./LabeledInput";
const data = require("../../../src/data.json");
const columnKeys = _.keysIn(data[0]);
let defaultColumnIndices = _.times(columnKeys.length, String);
let defaultRowIndices = _.times(data.length , String);

const STYLE_BOTTOM_RIGHT_GRID= {
    border: "1px solid #ddd",
    verticalAlign:"middle"
};
const STYLE_BOTTOM_LEFT_GRID = {
    backgroundColor: "lightblue",
    overflow:"hidden",
    textOverflow: "ellipsis",
    verticalAlign:"middle"
};
const STYLE_TOP_LEFT_GRID = {
    borderBottom: "2px solid #aaa",
    backgroundColor: "grey",
    overflow: "hidden",
    verticalAlign:"middle"
};
const STYLE_TOP_RIGHT_GRID = {
    borderBottom: "2px solid #aaa",
    backgroundColor: "grey",
    overflow: "hidden",
    verticalAlign:"middle"
};
const STYLE_HEADER = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #eee",
    borderRight: "1px solid #eee",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    paddingLeft:"20px",
    paddingRight:"20px",
    fontWeight:"900",
};

const STYLE_CELL = {
        display: "flex",
        borderBottom: "1px solid #eee",
        borderRight: "1px solid #eee",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        paddingLeft:"20px",
        paddingRight:"20px",
        overflow: "hidden",
        verticalAlign:"middle"

};

class VirtualGrid extends Component {

    componentDidMount(){
        this.rearrangeData();
    }

    rearrangeData() {
        const { lockedColumnIndices , lockedRowIndices} = this.props;
        let columnIndices = _.times(columnKeys.length, String);
        let rowIndices = _.times(data.length , String);
        if(lockedColumnIndices){

            let numbers = _.map(lockedColumnIndices , (a)=> a.toString());
            columnIndices =_.difference(columnIndices , numbers);
            columnIndices =_.concat(numbers , columnIndices);

            this.setState({fixedColumnCount:lockedColumnIndices.length});
        }
        if(lockedRowIndices){
            let numbers = _.map(lockedRowIndices, (a)=>  {
              return a.toString();
            });

            rowIndices =_.difference(rowIndices, numbers);
            // rowIndices =_.difference([String(0)] , columnIndices);
            rowIndices =_.concat(numbers, rowIndices);
            this.setState({fixedRowCount:lockedRowIndices.length});
        }
        this.setState({columnIndices,rowIndices});
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            fixedColumnCount: 0,
            fixedRowCount: 0,
            scrollToColumn: 0,
            scrollToRow: 0,
            rowIndices:[],
            columnIndices:[],
            data:[],
            cellStyle:STYLE_CELL,
            BottomLeftGridStyle:STYLE_BOTTOM_LEFT_GRID,
            BottomRightGridStyle:STYLE_BOTTOM_RIGHT_GRID,
            headerStyle:STYLE_HEADER,
            TopLeftGridStyle:STYLE_TOP_LEFT_GRID,
            TopRightGridStyle:STYLE_TOP_RIGHT_GRID,
        };
        this._cache = new CellMeasurerCache({
            defaultHeight: 30,
            defaultWidth: props.columnWidth,
            fixedHeight: true
        });
        this._cellRenderer = this._cellRenderer.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log("newprops", nextProps);
    }

    _cellRenderer({ columnIndex, key, parent, rowIndex, style }) {
       let { rowIndices , columnIndices} = this.state;
       const { primaryColor , secondaryColor , headerColor, headerFontSize , cellFontSize} = this.props;
        if(!rowIndices || !columnIndices){
            rowIndices = defaultRowIndices;
            columnIndices = defaultColumnIndices;
        }
        if(rowIndex === 0){
            style = _.assign(style,STYLE_HEADER , {backgroundColor:headerColor,color:"white" , fontSize:headerFontSize});
            return (
                <CellMeasurer
                    cache={this._cache}
                    columnIndex={columnIndex}
                    key={key}
                    parent={parent}
                    rowIndex={rowIndex}
                >
                    <div key={`${columnIndex}${rowIndex}`} className="font-weight-bold" style={style}>
                        <span className="align-middle">
                            <strong> {_.startCase(columnKeys[columnIndices[columnIndex]])} </strong>
                        </span>
                    </div>
                </CellMeasurer>
            );
        } else {
            if(data[rowIndices[rowIndex]][columnKeys[columnIndices[columnIndex]]].toString() < 20){
                style = _.assign(style,STYLE_CELL ,{alignItems: "center"});
            } else{
                style = _.assign(style,STYLE_CELL);
            }
            style = _.assign(style,{fontSize:cellFontSize});

            //alternate colour logic
            // if(lockedColumnIndices.length === 0 && lockedRowIndices.length === 1){
                if(rowIndex% 2===0 ){
                    let backgroundColor = primaryColor ? primaryColor : "white";
                    // let color = primaryColor ? "white" : "black";
                    let color = "black";
                    style = _.assign(style,{backgroundColor , color });
                }
                else{
                    let backgroundColor = secondaryColor ? secondaryColor : "lightgrey";
                    // let color = secondaryColor ? "white" : "black";
                    let color =  "black";
                    style = _.assign(style,{backgroundColor ,color});
                }
            // }

            return (
                <CellMeasurer
                    cache={this._cache}
                    columnIndex={columnIndex}
                    key={key}
                    parent={parent}
                    rowIndex={rowIndex}
                >
                    <div className="no-overflow" key={key} style={style}>
                       <span className="align-middle" style = {{paddingTop:"15px"}}>
                           {data[rowIndices[rowIndex]][columnKeys[columnIndices[columnIndex]]].toString()}
                       </span>
                    </div>
                </CellMeasurer>
            );
        }
    }

    _createEventHandler(property) {
        return event => {
            const value = parseInt(event.target.value, 10) || 0;

            this.setState({
                [property]: value
            });
        };
    }

    _createLabeledInput(property, eventHandler) {
        const value = this.state[property];

        return (
            <LabeledInput
                label={property}
                name={property}
                onChange={eventHandler}
                value={value}
            />
        );
    }

    shouldComponentUpdate(nextProps, nextState){
        const { primaryColor, secondaryColor, headerFontSize,cellFontSize,
            lockedRowIndices, componentHeight, lockedColumnIndices, headerColor} = this.props;
        return (primaryColor !== nextProps.primaryColor ||
            secondaryColor !== nextProps.secondaryColor ||
            headerFontSize!==nextProps.headerFontSize ||
        cellFontSize !== nextProps.cellFontSize||
        lockedRowIndices !== nextProps.lockedRowIndices||
        componentHeight !== nextProps.componentHeight||
        lockedColumnIndices !== nextProps.lockedColumnIndices||
        headerColor !== nextProps.headerColor
        );


    }


    render() {
        const {TopLeftGridStyle,TopRightGridStyle , BottomLeftGridStyle,BottomRightGridStyle} = this.state;
        const {componentHeight} = this.props;
        return (
            <AutoSizer>
                {({width}) =>
                    <MultiGrid
                        {...this.state}
                        tabIndex={1}
                        cellRenderer={this._cellRenderer}
                        columnCount={columnKeys.length}
                        enableFixedColumnScroll
                        enableFixedRowScroll
                        columnWidth={this._cache.columnWidth}
                        deferredMeasurementCache={this._cache}
                        height={componentHeight}
                        rowHeight={40}
                        overscanColumnCount={5}
                        overscanRowCount={35}
                        rowCount={data.length}
                        style={BottomRightGridStyle}
                        styleBottomLeftGrid={BottomLeftGridStyle}
                        styleTopLeftGrid={TopLeftGridStyle}
                        styleTopRightGrid={TopRightGridStyle}
                        styleBottomRightGrid={BottomRightGridStyle}
                        width={width}
                    />}
            </AutoSizer>
        );
    }
}

export default VirtualGrid;