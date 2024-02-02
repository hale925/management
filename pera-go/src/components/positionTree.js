import React, { useState } from 'react';
import { List, ListItem, Button, Collapse, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux'
import { IconCornerLeftDown, IconCornerDownRight} from '@tabler/icons-react'


const PositionTree = () => {
  const positions = useSelector((state) => state.positions.positions);
  const [expand, setExpand] = useState({});
  const [isHierarchyOpen, setIsHierarchyOpen] = useState(false);
  
  const toggleHierarchy = () => {
    setIsHierarchyOpen(!isHierarchyOpen);
  };
  

  const handleExpandToggle = (positionName) => {
    setExpand((prevExpand) => ({
      ...prevExpand,
      [positionName]: !prevExpand[positionName],
    }));
  };

  const renderPosition = () => {
    console.log('Render Positions:', positions);
     if (!positions|| !positions.length) {
      console.log('Positions are undefined or empty');
       return null; 
     }
    
     const topLevelPositions = positions.filter((position) => position.parentId === null || position.parentId === "null");

    return topLevelPositions.map((topLevelPosition) => (
      <List key={topLevelPosition.id}>
        <ListItem>
          <Button
            className='px-2 hover:bg-green-700'
            onClick={() => handleExpandToggle(topLevelPosition.name)}
          >
            <IconCornerLeftDown/>
          </Button>
          <Link to={`/positions/${topLevelPosition.name}`}>
            <Anchor className="py-2 px-2 w-full hover:bg-gray-700">
              {topLevelPosition.name}
            </Anchor>
          </Link>
        </ListItem>
        <Collapse in={expand?.[topLevelPosition.name]}>
          {renderChildPositions(topLevelPosition.name)}
        </Collapse>
      </List>
    ));
  };

  const renderChildPositions = (parentId, indentLevel = 1) => {
    if (!positions) {
      return null; 
    }
    const children = positions.filter((position) => position.parentId === parentId);

    return (
      <List withPadding style={{ paddingLeft: `${indentLevel * 5}px` }}>
        {children.map((child) => (
          <ListItem key={child.id}>
            <Button
              className='px-2 hover:bg-green-700'
              onClick={() => handleExpandToggle(child.name)}
            >
              <IconCornerDownRight/>
            </Button>
            <Link to={`/positions/${child.name}`}>
              <Anchor className="py-2 px-2 w-full hover:bg-gray-700">
                {child.name}
              </Anchor>
            </Link>
            <Collapse in={expand?.[child.name]}>
              {renderChildPositions(child.name, indentLevel + 1)}
            </Collapse>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div>
      <Button
        className='py-3 px-2 hover:bg-gray-700'
        onClick={toggleHierarchy}
      >
        Position Hierarchy
      </Button>
       {isHierarchyOpen && (
        <List>
          {renderPosition()}
        </List>
      )}
      
    </div>
  );
};

export default PositionTree;
