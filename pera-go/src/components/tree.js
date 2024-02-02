import React from 'react';
import { useSelector } from 'react-redux';
import { Tree, createTree } from './play'; 

const PositionTree = () => {
    const positions = useSelector((state) => state.positions.positions);
  
    const tree = createTree(positions, null);
  
    return (
      <div>
        <Tree tree={tree} />
      </div>
    );
  };
  
  export default PositionTree;
  