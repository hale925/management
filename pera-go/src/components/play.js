import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconCornerLeftDown, IconCornerDownRight } from '@tabler/icons-react';
import { List, ListItem, Button, Collapse, Anchor } from '@mantine/core';

const createTree = (positions, parentId = null, depth = 0) => {
  const children = positions
    .filter((position) => position.parentId === parentId)
    .map((position) => ({
      ...position,
      depth,
      children: createTree(positions, position.name, depth + 1),
    }));

  return children.length > 0 ? children : null;
};

const TreeItem = ({ position }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>
      <ListItem>
        <Button
          className="flex items-center"
          style={{ paddingLeft: `${position.depth * 20}px` }}
          onClick={handleToggle}
          leftIcon={isExpanded ? <IconCornerDownRight /> : <IconCornerLeftDown />}
        >
          <Link to={`/positions/${position.name}`}>
            <Anchor className="py-2 px-2 hover:bg-gray-700">
              {position.name}
            </Anchor>
          </Link>
        </Button>
      </ListItem>
      <Collapse isOpen={isExpanded}>
        {position.children && (
          <List>
            {position.children.map((child) => (
              <TreeItem key={child.name} position={child} />
            ))}
          </List>
        )}
      </Collapse>
    </div>
  );
};

const Tree = ({ tree }) => {
  return (
    <List className="md:flex md:flex-wrap">
      {tree.map((position) => (
        <TreeItem key={position.name} position={position} />
      ))}
    </List>
  );
};

export {Tree, createTree};
