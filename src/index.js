import React from 'react';
import ReactDOM from 'react-dom';
import HexagonGrid from './react-hexagon-grid'
import times from 'lodash/times';
import useWindowDimensions from './hooks/useWindowDimensions';

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
        fontSize={100}
        fontWeight="lighter"
        style={{ fill: 'blue' }}
        textAnchor="middle"
      >
        {hexagon}
      </text>
    );
  }

  let hexagons = times(100, id => id);

  return (
    <HexagonGrid
    gridWidth={width}
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
