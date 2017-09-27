import React, { Component } from 'react';
import {AutoSizer, MultiGrid} from 'react-virtualized';
import styles from "./MultiGrid.example.css";
import * as _ from "lodash";

import { LabeledInput } from "./LabeledInput";
const data = require("../../../src/data.json");
const columnKeys = _.keysIn(data[0]);
let defaultColumnIndices = _.times(columnKeys.length, String);
let defaultRowIndices = _.times(data.length , String);

const STYLE_BOTTOM_RIGHT_GRID= {
    color:"white",
    backgroundColor: "lightgreen",
    border: "1px solid #ddd"
};
const STYLE_BOTTOM_LEFT_GRID = {
    borderRight: "2px solid #aaa",
    backgroundColor: "lightblue",
    color:"white",
    overflow:"hidden"
};
const STYLE_TOP_LEFT_GRID = {
    color:"white",
    borderBottom: "2px solid #aaa",
    backgroundColor: "grey",
    borderRight: "2px solid #aaa",
    fontWeight: "bold",
    overflow:"hidden"
};
const STYLE_TOP_RIGHT_GRID = {
    borderBottom: "2px solid #aaa",
    fontWeight: "bold",
    color:"white",
    backgroundColor: "grey",
    overflow:"hidden"
};
const STYLE_HEADER = {
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #eee",
    borderRight: "1px solid #eee",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width:"100px"
};

const STYLE_CELL = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid #eee",
        borderRight: "1px solid #eee",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
};

class VirtualGrid extends Component {

    componentDidMount(){
        this.rearrangeData();
    }

    rearrangeData() {
        const { lockedColumnIndices , lockedRowIndices} = this.state;
        let columnIndices = _.times(columnKeys.length, String);
        let rowIndices = _.times(data.length , String);
        if(lockedColumnIndices){

            let numbers = _.map(lockedColumnIndices , (a)=>  a.toString());
            columnIndices =_.difference(columnIndices , numbers);
            columnIndices =_.concat(numbers , columnIndices);

            this.setState({fixedColumnCount:lockedColumnIndices.length});
        }
        if(lockedRowIndices){

            let numbers = _.map(lockedRowIndices, (a)=>  a.toString());
            rowIndices =_.difference(rowIndices, numbers);
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
            lockedRowIndices:[0],
            lockedColumnIndices:[2,3],
            rowIndices:[],
            columnIndices:[],
            data:[],
            columnWidth:100,
            cellStyle:STYLE_CELL,
            BottomLeftGridStyle:STYLE_BOTTOM_LEFT_GRID,
            BottomRightGridStyle:STYLE_BOTTOM_RIGHT_GRID,
            headerStyle:STYLE_HEADER,
            TopLeftGridStyle:STYLE_TOP_LEFT_GRID,
            TopRightGridStyle:STYLE_TOP_RIGHT_GRID,
        };
        this._cellRenderer = this._cellRenderer.bind(this);
        this._onFixedColumnCountChange = this._createEventHandler(
            "fixedColumnCount"
        );
        this._onFixedRowCountChange = this._createEventHandler("fixedRowCount");
        this._onScrollToColumnChange = this._createEventHandler("scrollToColumn");
        this._onScrollToRowChange = this._createEventHandler("scrollToRow");
    }


    _cellRenderer({ columnIndex, key, rowIndex, style }) {
       let { rowIndices ,lockedColumnIndices , lockedRowIndices , columnIndices} = this.state;
        if(!rowIndices || !columnIndices){
            rowIndices = defaultRowIndices;
            columnIndices = defaultColumnIndices;
        }
        if(rowIndex === 0){
            style = _.assign(style,STYLE_HEADER);
            return (
                <div key={`${columnIndex}${rowIndex}`} style={style}>
                    {columnKeys[columnIndices[columnIndex]]}
                </div>
            );
        } else {
            style = _.assign(style,STYLE_CELL);
            //alternate colour logic

            // if((rowIndex !== rowIndices[rowIndex].toNumber)){
            //     console.log("when row index is same");
            //     if(rowIndex% 2===0 ){
            //         style = _.assign(style,{backgroundColor:"red"});
            //     }
            //     else{
            //         style = _.assign(style,{backgroundColor:"black"});
            //     }
            // }
            // if((columnIndex !== columnIndices[columnIndex].toNumber)){
            //     console.log("when row index is same");
            //     if(columnIndex % 2===0 ){
            //         style = _.assign(style,{backgroundColor:"red"});
            //     }
            //     else{
            //         style = _.assign(style,{backgroundColor:"black"});
            //     }
            // }

            return (
                <div key={key} style={style}>
                    {data[rowIndices[rowIndex]][columnKeys[columnIndices[columnIndex]]].toString()}
                </div>
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


    render() {
        const {TopLeftGridStyle,columnWidth, TopRightGridStyle , BottomLeftGridStyle,BottomRightGridStyle} = this.state;
        return (
            <AutoSizer>
                {({ height , width }) =>
                    <MultiGrid
                        {...this.state}
                        cellRenderer={this._cellRenderer}
                        columnWidth={columnWidth}
                        columnCount={columnKeys.length}
                        enableFixedColumnScroll
                        enableFixedRowScroll
                        height={600}
                        rowHeight={40}
                        rowCount={data.length}
                        style={BottomRightGridStyle}
                        styleBottomLeftGrid={BottomLeftGridStyle}
                        styleTopLeftGrid={TopLeftGridStyle}
                        styleTopRightGrid={TopRightGridStyle}
                        width={width}
                    />}
            </AutoSizer>
        )
    }
}

export default VirtualGrid;