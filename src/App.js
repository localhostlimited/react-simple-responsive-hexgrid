import React from 'react';
import { GridGenerator, HexGrid, Layout, Hexagon, Text, Hex } from 'react-hexgrid';
import './App.css';

export default class App extends React.Component {
  hexSize = 10;
  hexagonSize = { x: this.hexSize, y: this.hexSize };

  gridSize = 30;
  hexUnitWidth = 7;
  hexUnitHeight = this.gridSize / this.hexUnitWidth;

  hasWindow = typeof window !== 'undefined';

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {}
  }

  getWindowDimensions() {
    const width = this.hasWindow ? window.innerWidth : null;
    const height = this.hasWindow ? window.innerHeight : null;
    this.setState({ height, width })
    return { height, width };
  }

  handleResize() {
    const { height, width } = this.getWindowDimensions();

    if (this.containerRef.current) {
      this.gridHeight = this.containerRef.current.offsetHeight;
      this.gridWidth = this.containerRef.current.offsetWidth;
      // const maxHeight = Math.min(this.gridHeight, height);
      // this.containerRef.current.maxHeight = maxHeight;
      this.setState({ gridHeight: this.gridHeight, gridWidth: this.gridWidth })
    }

    console.log('resize', 'h', height, 'w', width, 'gh', this.gridHeight, 'gw', this.gridWidth);
  }

  getGridData(){
    if(this.containerRef.current){
      this.hexUnitWidth = this.containerRef.current.offsetWidth / 150;
      this.hexUnitHeight = this.gridSize / this.hexUnitWidth;
    }
    return GridGenerator.orientedRectangle(this.hexUnitWidth, this.hexUnitHeight);
  }

  componentDidMount() {
    const hasWindow = typeof window !== 'undefined';
    if (hasWindow) {
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    this.handleResize(); // initialise
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    var vpHeight = 10*8.5;
    var vpWidth = 13.3*8.5;
    return (
      <div className="App" ref={this.containerRef}>

        height: {this.state.height}
        | width: {this.state.width}
        | gridHeight: {this.containerRef?.current?.offsetHeight}
        | maxGridHeight: {this.containerRef?.current?.maxHeight}
        | gridWidth: {this.containerRef?.current?.offsetWidth}
        <br />
        viewport: x = 0, y = 0, width = {(this.hexUnitWidth * this.hexSize)}, height =  {this.hexUnitWidth * this.hexSize}
        <br/>
        raw hex width vs height unit: {this.hexUnitWidth/this.hexUnitHeight}
        <br/>
        display hex width vs height unit: {(2.5+this.hexUnitWidth*7.5)/(this.hexUnitHeight*8.66+4.33)}
        <br/>
        vp ratio: {vpWidth/vpHeight}
        <br/>

        <HexGrid className="red" width={this.containerRef?.current?.offsetWidth} height={800}
          viewBox={"-10" + " " + "-3" + " " + vpWidth + " " + vpHeight}>
          <Layout size={this.hexagonSize} spacing={1} origin={{ x: 0, y: 0 }}>
            {this.getGridData()?.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}><Text>{hex.q  +"|"+ hex.r }</Text></Hexagon>)}
          </Layout>
        </HexGrid>
      </div>
    );
  }
}
