import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import HexagonGrid from '../node_modules/react-hexagon-grid'
import times from 'lodash/times';
import useWindowDimensions from './hooks/useWindowDimensions';

const HexGridDemo = () =>  {
  const getHexProps = (hexagon) => {
    return {
      style: {
        fill: '#007aff',
        stroke: 'white',
        rotate: '30deg'
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
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: 'white' }}
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
