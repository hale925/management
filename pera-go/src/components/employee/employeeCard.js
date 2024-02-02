
import React from 'react';
import { Card, Image, Text, Group } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

const EmployeesCard = ({ employee }) => {
  
  const navigate = useNavigate();

  

  const handleEmployeeClick = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const handlePositionClick = (positionName) => {
    navigate(`/positions/${positionName}`);
  };

  return (
    <Card key={employee.employeeId} 
    className="border focus:border-green-500 hover:shadow-md transition-all" 
    withBorder>
      <Card.Section>
        <Image src={employee.image} 
        className="h-80 w-auto border-2 border-black" alt={employee.fullName} />
      </Card.Section>

      <Group className="flex justify-between items-center mt-4 mb-2 bg-white-500">
        <Link
          onClick={() => handleEmployeeClick(employee.employeeId)}
          className="hover:underline hover:text-xl transition-all"
        >
          <Text fw={500} className="text-lg md:text-xl lg:text-2xl">
            {employee.fullName}
          </Text>
        </Link>
        <Link
          onClick={() => handlePositionClick(employee.jobTitle)}
          className="px-4 py-1 bg-green-500 text-white font-bold rounded-full"
        >
          {employee.jobTitle}
        </Link>
      </Group>

      <Group className="my-3 bg-white-500">
        <Text className="text-lg my-2 ml-2 text-gray-800">
          Gender: {employee.gender}
        </Text>
        <Text className="text-lg my-2 ml-4 text-gray-600">
          Email: {employee.email}
        </Text>
        <Text className="text-lg my-2 ml-4 text-gray-600">
          Phone: {employee.phoneNumber}
        </Text>
      </Group>
    </Card>
  );
};

export default EmployeesCard;
