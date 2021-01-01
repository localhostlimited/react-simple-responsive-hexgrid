import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import times from 'lodash/times';
import Hexagon from 'react-hexagon';

const getGridDimensions = (gridWidth, gridHeight, N) => {
  const sizeFactor = 3;
  const y = 3;

  const a = (sizeFactor * gridHeight) / (gridWidth * Math.sqrt(y));
  const b = (gridHeight / (2 * gridWidth)) - 2;

  let columnsRaw = (-b + Math.sqrt((b * b) + (4 * N * a))) / (2 * a);
  let columns = Math.round(columnsRaw * 2) / 2;

  const hexSize = Math.floor(gridWidth / ((3 * columns) + 0.5));
  const rows = Math.ceil(N / columns);
  const hexHeight = Math.ceil(hexSize * Math.sqrt(3));

  const result = {
    columns,
    rows,
    hexSize,
    hexWidth: hexSize * 2,
    hexHeight: hexHeight,
    hexGridHeight: hexHeight * ((rows / 2) + 0.5)
  };
  return result;
};

const tryInvoke = (func, params = [], defaultValue = null) => {
  return isFunction(func) ? func(...params) : defaultValue;
}

const HexagonGrid = (props) => {
  const {
    hexagons,
    gridHeight,
    gridWidth,
    renderHexagonContent,
    hexProps,
    x,
    y,
  } = props;

  const [state, setState] = useState({
    columns: 1,
    hexSize: 1,
    hexWidth: 1,
    hexHeight: 1,
    rows: 0,
  });

  useEffect(() => {
    if (!isEmpty(hexagons) && gridWidth > 0 && gridHeight > 0) {
      setState(getGridDimensions(gridWidth, gridHeight, hexagons.length));
    }
  }, [hexagons, gridWidth, gridHeight]);

  const getHexDimensions = (row, col) => {
    const dimensions = {
      width: `${state.hexWidth}px`,
      height: `${state.hexHeight}px`,
      x: col * state.hexSize * 3
    };
    if (row % 2 === 1) {
      dimensions.x += state.hexSize * (3 / 2);
    }
    return dimensions;
  };

  const getRowDimensions = (row) => {
    const dimensions = {
      y: `${row * ((state.hexSize * (Math.sqrt(3) / 2)))}px`,
      height: `${state.hexHeight}px`,
      width: gridWidth
    };
    if (row % 2 === 0) {
      dimensions.marginLeft = `${(state.hexSize / 2) * 3}px`;
    }
    return dimensions;
  };

  return (
    <svg className="hexGrid" width={gridWidth} height={state.hexGridHeight} x={x} y={y} >
      {
        times(state.rows, (row) => {
          const remaining = hexagons.length - (row * state.columns);
          let rawColumns = remaining < state.columns ? remaining : state.columns;
          let columns = rawColumns;

          if (rawColumns % 1 === 0.5) {
            if (row % 2 === 0) {
              columns = Math.ceil(columns);
            } else {
              columns = Math.floor(columns);
            }
          }

          const rowDim = getRowDimensions(row);
          return (
            <svg key={row} width={rowDim.width} height={rowDim.height} y={rowDim.y}>
              {
                times(columns, (col) => {
                  const iHexagon = Math.ceil(row * state.columns) + col;
                  const hexagon = hexagons[iHexagon];
                  const hexDim = getHexDimensions(row, col);
                  const _hexProps = tryInvoke(hexProps, [hexagon], hexProps);
                  return (
                      <svg
                        className="hexagon"
                        key={iHexagon}
                        height={hexDim.height}
                        width={hexDim.width}
                        x={`${hexDim.x}px`}
                      >
                        <svg className="hexagon-mask" viewBox="0 0 645 560" onClick={() => { alert("hexa clicked" + iHexagon) }} style={{pointerEvents: "bounding-box"}}>
                          <g>
                            <clipPath id="hex-mask">
                              {/* <polygon points="270,0 0,160 0,485 270,645 560,485 560,160"></polygon> */}
                              <polygon points="161,0 0,280 161,560 484,560 645,280 484,0"></polygon>
                            </clipPath>
                          </g>
                          {/* <polygon clip-path="url(#hex-mask)" points="270,0 0,160 0,485 270,645 560,485 560,160" stroke="purple" stroke-width="30" fill="none" height="100%" width="100%" preserveAspectRatio="xMidYMin slice"></polygon> */}
                          <image clip-path="url(#hex-mask)" xlinkHref="http://placekitten.com/1000" height="100%" width="100%" preserveAspectRatio="none"></image>
                          <polygon clip-path="url(#hex-mask)" points="161,0 0,280 161,560 484,560 645,280 484,0" stroke="purple" stroke-width="30" fill="none" height="100%" width="100%" preserveAspectRatio="xMidYMin slice">
                          </polygon>
                          {tryInvoke(renderHexagonContent, [hexagon], <tspan />)}
                        </svg>
                      </svg>
                  );
                })
              }
            </svg >
          );
        })
      }
    </svg >
  );
}

HexagonGrid.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  hexagons: PropTypes.arrayOf(PropTypes.any).isRequired,
  hexProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  renderHexagonContent: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};

HexagonGrid.defaultProps = {
  hexProps: {},
  renderHexagonContent: null,
  x: 0,
  y: 0
};

export default HexagonGrid;

