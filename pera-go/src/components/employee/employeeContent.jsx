
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button, Breadcrumbs, Text, Title, Anchor, Image } from '@mantine/core';
import { deleteEmployee, getEmployees } from './employeeApi'; // Import the API function for deleting an employee
import { fetchEmployeesSuccess } from './employeeSlice';

const EmployeeContent = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const selectedEmployee = employees.find((employee) => employee.employeeId === employeeId);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleJobTitleClick = () => {
    if (selectedEmployee && selectedEmployee.jobTitle) {
      navigate(`/positions/${selectedEmployee.jobTitle}`);
    }
  };

  const handleEditClick = () => {
    if (selectedEmployee) {
      navigate(`/employee/${selectedEmployee.id}/edit`);
    }
  };

  const handleDeleteClick = async () => {
    const shouldDelete = window.confirm('Are you sure you want to delete this employee?');

    if (shouldDelete) {
      try {
        
        await deleteEmployee(employeeId);

        
        const updatedEmployees = await getEmployees();
        dispatch(fetchEmployeesSuccess(updatedEmployees));

        
        navigate(`/positions/${selectedEmployee.jobTitle}`);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    } else {
      console.log('Deletion canceled');
    }
  };

  return (
    <Container size="xl" className="min-h-screen">
      <header className="bg-gray-300 py-4 flex justify-between items-center">
        <Breadcrumbs>
          <Anchor
            className="mx-2 transition duration-300 hover:font-bold hover:underline focus:font-bold focus:underline"
            onClick={handleJobTitleClick}
          >
            {selectedEmployee && selectedEmployee.jobTitle}
          </Anchor>
        </Breadcrumbs>
        <Button
          className="bg-green-800 px-4 text-white font-bold hover:bg-gray-700"
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
      </header>
      <main className="my-8 p-4 md:p-8 lg:p-12">
        {selectedEmployee ? (
          <div>
            
            <div className="mb-4 flex flex-col md:flex-row md:justify-between items-center">
              <Image
                src={selectedEmployee.image}
                alt={selectedEmployee.fullName}
                className="rounded-full w-64 h-64 mb-4 md:mb-0 md:mr-8"
              />
              <div className="text-right">
              <Title order={1}
              orderMobile={2}
              orderTablet={2}
              orderDesktop={2}
              className="text-center py-4 text-2xl md:text-3xl lg:text-4xl font-bold text-green-800"
            >{selectedEmployee.fullName}</Title>
            <div className='flex'>
            <Text size="md" className="mb-2 font-bold text-green-800">
                  Job Title: 
                </Text>
                <Text>{selectedEmployee.jobTitle}</Text>
            </div>
            <div className='flex'>
            <Text size="md" className="mb-2 font-bold text-green-800">
                  Gender: 
                </Text>
                <Text>{selectedEmployee.gender}</Text>
            </div>
                
              </div>
            <div/>
              
                
            </div>
            <div className="mb-2 mt-4 py-8 md:flex-row md:justify-between items-center">
              <div className="mb-2 md:mb-0">
                <Text size="md" className="font-bold py-2 text-green-800">
                  Email: 
                </Text>
                <Text className='ml-4 px-2'>{selectedEmployee.email}</Text>
              </div>
              <div className="mb-4 text-left">
                <Text size="md" className="mb-2 md:mb-0 py-2 font-bold text-green-800">
                  Phone Number: 
                </Text>
                <Text className='ml-4 px-2'>{selectedEmployee.phoneNumber}</Text>
              </div>
            </div>
            <div className="mb-4 text-left">
              <Text size="md" className="mb-2 py-2 font-bold text-green-800">
                Employee Details: 
              </Text>
              <Text className='ml-4 px-2'>{selectedEmployee.employeeDetail}</Text>
            </div>
            <div className="flex space-x-4 py-4">
              <Button
                className='bg-green-800 px-4 py-3 text-white font-bold hover:bg-gray-700'
                onClick={handleEditClick}
              >
                Edit
              </Button>
              <Button
                className='bg-green-800 px-4 py-3 text-white font-bold hover:bg-gray-700'
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center">Employee not found</p>
        )}
      </main>
    </Container>
  );
};

export default EmployeeContent;
