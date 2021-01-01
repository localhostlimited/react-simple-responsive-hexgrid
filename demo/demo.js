import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import HexagonGrid from '../src/HexagonGrid';
import times from 'lodash/times';
import useWindowDimensions from '../src/hooks/useWindowDimensions';

const HexGridDemo = () =>  {
  const getHexProps = (hexagon) => {
    return {
      style: {
        fill: '#007aff',
        stroke: 'white',
      },
      onClick: () => alert(`Hexagon n.${hexagon} has been clicked`)
    };
  }

  const { height, width } = useWindowDimensions();

  const renderHexagonContent = (hexagon) => {
    return (
      <text
        x="50%"
        y="50%"
        fontSize={150}
        fontWeight="bold"
        style={{ fill: 'black' }}
        textAnchor="middle"
        >
        {hexagon}
      </text>
    );
  }

  let hexagons = times(100, id => id);

  return (
    <HexagonGrid
    gridWidth={width-20}
    gridHeight={height}
    hexagons={hexagons}
    hexProps={getHexProps}
    renderHexagonContent={renderHexagonContent}
    />
  );
}

ReactDOM.render(
  <HexGridDemo />,
  document.getElementById('root')
);
