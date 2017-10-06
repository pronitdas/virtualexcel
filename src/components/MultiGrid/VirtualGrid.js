import React, { Component } from 'react';
import {AutoSizer, CellMeasurer, CellMeasurerCache, MultiGrid} from 'react-virtualized';
import "./MultiGrid.example.css";
import * as _ from "lodash";
import { LabeledInput } from "./LabeledInput";
import { Resizable, ResizableBox } from 'react-resizable';
const STYLE_BOTTOM_RIGHT_GRID= {
    border: "1px solid #ddd",
    verticalAlign:"middle"
};
const STYLE_BOTTOM_LEFT_GRID = {
    backgroundColor: "whitesmoke",
    textOverflow: "ellipsis",
    overflow: "hidden",

};
const STYLE_TOP_LEFT_GRID = {
    borderBottom: "2px solid #aaa",
    backgroundColor: "grey",
    overflow: "hidden",
};
const STYLE_TOP_RIGHT_GRID = {
    borderBottom: "2px solid #aaa",
    backgroundColor: "grey",
    overflow: "hidden",

};
const STYLE_HEADER = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #eee",
    borderRight: "1px solid #eee",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    paddingLeft:"20px",
    paddingRight:"20px",
    fontWeight:"900",
};

const STYLE_CELL = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid #eee",
        borderRight: "1px solid #eee",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        paddingLeft:"20px",
        paddingRight:"20px"

};

class VirtualGrid extends Component {

    componentDidMount(){
        const { data , columnKeys} = this.props;
        this.rearrangeData();

        let arrayOfdata = _.map(data , (a)=>{
            return _.map(_.keysIn(a) ,(b)=>{
               return a[b];
            });
        });

        arrayOfdata = _.concat([columnKeys] , arrayOfdata);
    }

    rearrangeData() {
        const { lockedColumnIndices , lockedRowIndices ,data , columnKeys} = this.props;

        let columnIndices = _.times(columnKeys.length, String);
        let rowIndices = _.times(data.length , String);
        if(lockedColumnIndices){
            let numbers = _.map(lockedColumnIndices , (a)=> a.toString());
            columnIndices =_.difference(columnIndices , numbers);
            columnIndices =_.concat(numbers , columnIndices);
            columnIndices.unshift("-1");
            this.setState({fixedColumnCount:lockedColumnIndices.length+1});
        } else {
            this.setState({fixedColumnCount:1});
        }
        if(lockedRowIndices){
            let numbers = _.map(lockedRowIndices, (a)=>  {
                return a.toString();
            });

            rowIndices =_.difference(rowIndices, numbers);
            // rowIndices =_.difference([String(0)] , columnIndices);
            rowIndices =_.concat(numbers, rowIndices);
            console.log(rowIndices);
            this.setState({fixedRowCount:lockedRowIndices.length+1});
        }else {
            this.setState({fixedRowCount:1});
        }
        rowIndices.unshift("-1");
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
            hoveredColumnIndex:null,
            hoveredRowIndex:null,
        };
        this._cache = new CellMeasurerCache({
            defaultHeight: 30,
            defaultWidth: props.columnWidth,
            fixedHeight: true
        });
        this._indexCache = new CellMeasurerCache({
            defaultHeight: props.rowHeight,
            defaultWidth: 60,
            fixedHeight: true
        });
        this._cellRenderer = this._cellRenderer.bind(this);
        this.onMouseOver=this.onMouseOver.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { primaryColor , secondaryColor} = this.props;
        if(!_.isEqual(primaryColor , nextProps.primaryColor || !_.isEqual(secondaryColor ,nextProps.secondaryColor) )){
            this.setState({scrollToRow:0 ,scrollToColumn:0 });
        }
    }
    onMouseOver(columnIndex , rowIndex) {
        this.setState({
            hoveredColumnIndex: columnIndex,
            hoveredRowIndex: rowIndex
        });
    }
    _cellRenderer({ columnIndex, key, parent, rowIndex, style }) {
       let { rowIndices , columnIndices , hoveredColumnIndex , hoveredRowIndex} = this.state;
       const { primaryColor , rowHeight,secondaryColor ,lockedColumnKeys,
           lockedRowIndices, colWidth, headerColor,onFreezeColHandle, headerFontSize , cellFontSize, columnKeys, data ,
           handleColResize, maxColumnWidth , minColumnWidth , maxRowHeight , minRowHeight} = this.props;
        if(!rowIndices || !columnIndices){
            rowIndices = _.times(columnKeys.length, String);
            columnIndices = _.times(data.length , String);
        }

        // some how implementing col ressizer
        let width= style.width + colWidth[columnIndex];
        style = _.assign(style,{width});
        let calcLeft = columnIndex > 0 ?_.slice(colWidth,0,columnIndex) : 0;

        calcLeft = style.left + _.sum(calcLeft);

        style = _.assign(style,{left:calcLeft});


        if(rowIndices[rowIndex] === "-1"){
            if(columnIndices[columnIndex] === "-1"){
                style = _.assign(style,STYLE_HEADER);
                return (
                    <div key={`${rowIndex}-${columnIndex}`} style={style}>
                    </div>
                );
            } else {
                style = _.includes(lockedColumnKeys , columnKeys[columnIndices[columnIndex]]) ?_.assign(style, STYLE_HEADER, {backgroundColor:"white",color:"black" , fontSize:headerFontSize})
                    : _.assign(style,STYLE_HEADER ,{backgroundColor:headerColor,color:"white" , fontSize:headerFontSize});
                    return (
                        <Resizable className={`col${columnIndex}`}
                                   height={rowHeight}
                                   width={colWidth[columnIndex]}
                                   onResizeStop={(data ,{element ,size}) =>{
                                       handleColResize(size,columnIndex);
                                   } }
                                   axis="x"
                                   key={key}
                        >
                            <div  className={`font-weight-bold  col${columnIndex}`} id={`col${columnIndex}`} style={style}>
                                <span title={_.startCase(columnKeys[columnIndices[columnIndex]])} className="truncate p-t-10 freezeCol align-middle"
                                      onClick={ ()=> {
                                          let idea = columnIndices[columnIndex] + ","+ columnKeys[columnIndices[columnIndex]];
                                          if(columnIndex>0){
                                             onFreezeColHandle(idea);
                                          }
                                      }}
                                >
                                    <strong> {_.startCase(columnKeys[columnIndices[columnIndex]])} </strong>
                                </span>
                            </div>
                        </Resizable>
                    );
                }
            } else {
            if(columnIndices[columnIndex] === "-1"){
                style = _.assign(style,STYLE_CELL);
                return (
                    <div key={key} style={style}  >
                            <label className="switch">
                                <input type="checkbox" onChange={ ()=> {
                                    this.props.onFreezeRowHandle(rowIndices[rowIndex]);
                                }} checked={_.includes(lockedRowIndices , rowIndices[rowIndex])}/>
                                <span className="slider round"></span>
                            </label>
                    </div>
                   );
            } else {
                style = _.assign(style,STYLE_CELL ,{fontSize:cellFontSize});


                //alternate colour logic

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

                let className = (hoveredColumnIndex || hoveredRowIndex) ? `hoveredItem` : ``;
                return (
                    <div className={`no-overflow col${columnIndex} ${className}` }  title={data[rowIndices[rowIndex]][columnKeys[columnIndices[columnIndex]]].toString()} key={key} style={style}>
                        <p onMouseOver={this.onMouseOver(columnIndex,rowIndex)} className={'p-t-10 truncate item'}>
                            {data[rowIndices[rowIndex]][columnKeys[columnIndices[columnIndex]]].toString()}
                        </p>
                    </div>

                );
            }
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
    componentDidUpdate(prevProps , prevState){
        const { primaryColor, secondaryColor, headerFontSize,cellFontSize,
            lockedRowIndices, componentHeight, lockedColumnIndices, headerColor, colWidth} = this.props;
        if (primaryColor !== prevProps.primaryColor ||
            secondaryColor !== prevProps.secondaryColor ||
            headerFontSize!==prevProps.headerFontSize ||
            cellFontSize !== prevProps.cellFontSize||
            lockedRowIndices !== prevProps.lockedRowIndices||
            componentHeight !== prevProps.componentHeight||
            lockedColumnIndices !== prevProps.lockedColumnIndices||
            headerColor !== prevProps.headerColor
        ){
            this._grid.forceUpdate();
        }

        if(!_.isEqual(colWidth,prevProps.colWidth)){
            this._grid.forceUpdate();

        } else{
        }
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
        const {componentHeight , data ,componentWidth, rowHeight,columnKeys, columnWidth} = this.props;
        return (
            <div style={{width:"100%"}}>
                <AutoSizer disableHeight>
                {({ width }) =>
                    <MultiGrid
                        ref={(ref) => this._grid = ref}
                        {...this.state}
                        tabIndex={10}
                        cellRenderer={this._cellRenderer}
                        columnCount={columnKeys.length+1}
                        enableFixedColumnScroll
                        enableFixedRowScroll
                        columnWidth={columnWidth}
                        height={componentHeight}
                        rowHeight={rowHeight}
                        overscanColumnCount={5}
                        overscanRowCount={35}
                        rowCount={data.length+1}
                        style={BottomRightGridStyle}
                        styleBottomLeftGrid={BottomLeftGridStyle}
                        styleTopLeftGrid={TopLeftGridStyle}
                        styleTopRightGrid={TopRightGridStyle}
                        styleBottomRightGrid={BottomRightGridStyle}
                        width={width}
                    />}
                </AutoSizer>
            </div>
        );
    }
}

export default VirtualGrid;