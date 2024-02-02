import React,{ useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button, Breadcrumbs, Text, Title, Anchor, Divider } from '@mantine/core';
import EmployeeCarousel from './employee/EmployeeCarousel';

import { getEmployees } from './employee/employeeApi';
import { fetchEmployeesStart, fetchEmployeesSuccess, fetchEmployeesFailure } from './employee/employeeSlice';

const PositionContent = () => {
  const { positionName } = useParams();
  const navigate = useNavigate();
  const positions = useSelector((state) => state.positions.positions);
  const fetchedPosition = positions.find((position) => position.name === positionName);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchEmployeesStart());
      try {
        const data = await getEmployees();
        dispatch(fetchEmployeesSuccess(data));
        console.log('Reducer: fetchEmployeesSucess', fetchEmployeesSuccess(data));
      } catch (error) {
        dispatch(fetchEmployeesFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const getPositionAncestors = (parentId) => {
    const ancestors = [];
    let currentParentId = parentId;

    const findAncestor = (parentId) => {
      const ancestor = positions.find((position) => position.name === parentId);

      if (ancestor) {
        ancestors.push({ title: ancestor.name, href: `/positions/${ancestor.name}` });

        if (ancestor.parentId !== null) {
          findAncestor(ancestor.parentId);
        }
      }
    };

    findAncestor(currentParentId);
    return ancestors.reverse();
  };

  const ancestorPaths = getPositionAncestors(fetchedPosition?.parentId);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    if (fetchedPosition) {
      navigate(`/positions/${fetchedPosition.id}/edit`);
    }
  };

  const handleDeleteClick = () => {
    if (fetchedPosition) {
      navigate(`/positions/${fetchedPosition.id}/delete`);
    }
  };

  return (
    <Container size="xl" className="h-screen flex flex-col">
      
        <header className="bg-gray-300 py-4 flex justify-between items-center px-4">
        <Breadcrumbs>
          <div className="flex items-center">
            {ancestorPaths.map((ancestor, index) => (
              <React.Fragment key={index}>
                <Anchor
                  href={ancestor.href}
                  className="mx-2 transition duration-300 hover:font-bold hover:underline focus:font-bold focus:underline"
                >
                  {ancestor.title}
                </Anchor>
                {index < ancestorPaths.length - 1 && <span className="mx-2">/</span>}
              </React.Fragment>
            ))}
          </div>
        </Breadcrumbs>
        <Button
          className='bg-green-800 px-4 text-white font-bold hover:bg-gray-700'
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
      </header>
      <main className="my-8 flex-grow px-4">
      <div className="h-screen flex flex-col">
        <div className="flex justify-between mb-4">
          <div>
            <Title
              order={1}
              orderMobile={2}
              orderTablet={2}
              orderDesktop={2}
              className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-green-800"
            >
              {fetchedPosition ? fetchedPosition.name : 'Position not found'}
            </Title>
            <div className="flex mt-2 md:mt-4">
              <Text size="md" className="mr-2 text-green-800 font-bold">
                Department:
              </Text>
              <Text>{fetchedPosition?.parentId || 'No Department'}</Text>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              className='bg-green-800 px-4 text-white font-bold hover:bg-gray-700'
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button
              className='bg-green-800 px-4 text-white font-bold hover:bg-gray-700'
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </div>
        <Divider my="md" />
        <div className="flex-grow">
          {fetchedPosition && (
            <>
              <Text size="lg" className="mb-2 text-green-800 font-bold">
                Description:
              </Text>
              <Text>{fetchedPosition.description}</Text>
            </>
          )}
        </div>
      </div>
      
        <div className="h-screen flex-grow bg-green-100 p-4 rounded-md">
          {fetchedPosition && <EmployeeCarousel jobTitle={fetchedPosition.name} />}
        </div>
      </main>
    </Container>
  );
};

export default PositionContent;
