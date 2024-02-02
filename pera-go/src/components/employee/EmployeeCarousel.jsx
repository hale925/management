import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from '@mantine/carousel';

import EmployeesCard from './employeeCard';

const EmployeeCarousel = ({ jobTitle }) => {
  const employees = useSelector((state) => state.employees.employees);
  const filteredEmployees = employees.filter((employee) => employee.jobTitle === jobTitle);

  return (
    <div className="border border-green-500 bg-gray-100">
      <Carousel
        className="sm:h-200 md:h-250 lg:h-300 space-x-4"
        transition="fade"
        align="start"
        withControls  // Ensure withControls is set to true
      >
        {filteredEmployees.map((emp) => (
          <Carousel.Slide key={emp.employeeId} className="focus:outline-none">
            <div className="flex flex-col justify-center items-center">
              <EmployeesCard employee={emp} />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default EmployeeCarousel;
