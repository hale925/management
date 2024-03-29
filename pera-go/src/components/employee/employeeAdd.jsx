// AddEmployee.jsx
import React, { useState } from 'react';
import { Button, Fieldset, Group, TextInput, Textarea, FileInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesSuccess } from './employeeSlice';
import { createEmployee, getEmployees } from './employeeApi';
import SearchableCombobox from '../SearchableCombobox';

function AddEmployee() {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.positions.positions);
  const list = positions.map((pos) => (pos ? pos.name : null)).filter(Boolean);
  list.unshift('null');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const onSubmitHandler = async (data) => {
    try {
      data.jobTitle = selectedValue;
      await createEmployee(data);

      const updatedEmployees = await getEmployees(); 
      dispatch(fetchEmployeesSuccess(updatedEmployees));

      console.log('New employee created successfully!');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const onClearForm = () => {
    reset();
    setSearch('');
    setSelectedValue('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="bg-gray-700 text-bold text-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2">
        <Fieldset legend="Personal Information" className="mb-8 py-4 px-8 ">
          <Group position="center">
            <TextInput
              label="Full Name"
              placeholder="Enter Full Name*: "
              {...register('fullName', { required: true, message: 'Please provide Full Name' })}
              error={errors.fullName}
              helperText={errors.fullName ? 'Please provide Full Name' : ''}
              className="mb-4 "
              classNames={{
                input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
              }}
            />

            <Fieldset legend="Image Input" className="mb-4 flex ">
              <TextInput
                label="Image URL"
                placeholder="Enter Image URL"
                {...register('image', { required: true, message: 'Please provide Image URL' })}
                error={errors.image}
                classNames={{
                  input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
                }}
                helperText={errors.image ? 'Please provide Image URL' : ''}
                className="mb-2 px-4 lg"
              />
              <FileInput
                // label="Image Upload"
                placeholder="Upload Image"
                accept="image/*"
                {...register('image', { required: true, message: 'Please provide an Image' })}
                error={errors.image}
                helperText={errors.image ? 'Please provide an Image' : ''}
                className="mb-4 px-4 bg-green-700 py-4 md"
              />
            </Fieldset>

            <SearchableCombobox
              list={list}
              value={selectedValue}
              setValue={setSelectedValue}
              search={search}
              cols={50}
              setSearch={setSearch}
              label="Job Title"
              className="mb-4 py-2 flex w-full"
            />

            <TextInput
          label="Email"
          placeholder="Enter Email"
          {...register('email', {
            required: true,
            pattern: /\S+@\S+\.\S+/,
          })}
          error={errors.email}
          helperText={errors.email ? 'Please provide a valid Email' : ''}
          className="mb-4"
          classNames={{
            input: `w-full md:w-2/3 lg:w-1/2 focus:outline-none ${errors.email ? 'border-red-500' : 'bg-gray-600'}`,
          }}
        />


            <TextInput
              label="Phone Number"
              placeholder="Enter Phone Number"
              {...register('phoneNumber', { required: true, message: 'Please provide Phone Number' })}
              error={errors.phoneNumber}
              helperText={errors.phoneNumber ? 'Please provide Phone Number' : ''}
              className="mb-4"
              classNames={{
                input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
              }}
            />

            <TextInput
              label="Gender"
              placeholder="Write name of your Gender"
              {...register('gender', { required: true, message: 'Please select Gender' })}
              error={errors.gender}
              helperText={errors.gender ? 'Please enter Male or Female': ''}
              className="mb-4"
              classNames={{
                input: 'w-full md:w-2/3 bg-gray-600 lg:w-1/2 focus:outline-none',
                }}
              />
            


            <Textarea
              label="Employee Detail (optional)"
              placeholder="Enter the employee detail"
              rows={5}
              classNames={{
                input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
              }}
              {...register('employeeDetail')}
              className="mb-4"
            />
          </Group>
        </Fieldset>

        <Group position="right px-8">
          <Button type="button" color="gray" onClick={onClearForm} 
          className="mr-4 hover:bg-white hover:text-gray-600">
            Clear
          </Button>
          <Button type="submit" 
          className="bg-green-500 hover:bg-white hover:text-gray-600 text-white font-bold py-2 px-4 rounded">
            Save
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default AddEmployee;
