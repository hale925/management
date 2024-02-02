import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button, Text, Title, Divider } from '@mantine/core';
import { fetchPositionsSuccess } from './positionSlice';
import { deletePosition, getPositions, updatePosition } from './positionApi';

const DeletePosition = () => {
  const { positionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.positions.positions);
  const positionToDelete = positions.find((position) => position.id === positionId);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleDeleteClick = async () => {
    try {
      const children = positions.filter((position) => position.parentId === positionToDelete?.name);
  
      if (children.length > 0) {
        // If the position has children, update their parent IDs
        const updatedChildren = children.map((child) => ({
          ...child,
          parentId: positionToDelete?.parentId || null,
        }));
  
        // Update the parent IDs of children in the database
        await Promise.all(updatedChildren.map((child) => updatePosition(child.id, child)));
      }
  
      // After updating children's parent IDs, delete the position
      await deletePosition(positionId);
  
      // Fetch the updated list of positions
      const updatedPositions = await getPositions();
      dispatch(fetchPositionsSuccess(updatedPositions));
  
      // Navigate back to the positions list or any other desired page
      navigate(-1);
    } catch (error) {
      console.error('Error deleting position:', error);
    }
  };
  

  return (
    <Container size="xl" className="h-screen flex flex-col">
      
      <main className="my-8 flex-grow">
        <Title
          order={1}
          orderMobile={2}
          orderTablet={2}
          orderDesktop={2}
          className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-red-800"
        >
          Delete Position
        </Title>
        <Divider my="md" />
        <div className="mt-4">
          <Text size="lg" className="mb-2 text-red-800 font-bold">
            Are you sure you want to delete the position "{positionToDelete?.name}"?
          </Text>
          <Text>
            Deleting this position will permanently remove it from the system. This action cannot
            be undone.
          </Text>
        </div>
        <Divider my="md" />
        <div className="flex justify-end">
          <Button
            className='bg-red-800 px-4 py-4 text-white font-bold hover:bg-gray-700'
            onClick={handleDeleteClick}
          >
            Delete Position
          </Button>
          <Button
            className='bg-gray-700 px-4 py-4 text-white font-bold hover:bg-gray-500'
            onClick={handleBackButtonClick}
          >
            Cancel
          </Button>
        </div>
      </main>
    </Container>
  );
};

export default DeletePosition;
