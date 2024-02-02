import React, { useState } from 'react';
import { Button, Group, TextInput, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPositionsSuccess } from './positionSlice';
import { createPosition, getPositions } from './positionApi';
import SearchableCombobox from './SearchableCombobox';


function AddPosition() {
  const dispatch = useDispatch();
  const parentIds = useSelector((state) => state.positions.positions);
  const list = parentIds.map((pos) => (pos ? pos.name : null)).filter(Boolean);
  list.unshift("null");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  
  const onSubmitHandler = async (data) => {
    try {
      data.parentId = selectedValue;
      await createPosition(data);

      const updatedPositions = await getPositions();
      dispatch(fetchPositionsSuccess(updatedPositions));

      console.log('New position created successfully!');
    } catch (error) {
      console.error('Error creating position:', error);
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
        <Group position="center" className="mb-4">
          <TextInput
            label="Position Name: "
            placeholder="Enter Position Name"
            {...register('name', { required: true, message: 'Please provide Position Name' })}
            error={errors.name}
            rightSectionWidth= 'padding-right'
            classNames={{
              input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
            }}
            helperText={errors.name && 'Please provide Position Name'}
            className='py-4 '
          />

             <SearchableCombobox
              list={list}
              value={selectedValue}
              setValue={setSelectedValue}
              search={search}
              setSearch={setSearch}
              label="Job Title"
              
              className="mb-4 py-2 "
            />

          <Textarea
            label="Job Description (optional)"
            placeholder="Enter the job description"
            rows={10}
            classNames={{
              input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
            }}
            {...register('description')}
            className="mt-4"
          />
        </Group>

        <Group position="right">
          <Button type="button" color="gray" onClick={onClearForm} className="mr-4">
            Clear
          </Button>
          <Button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
            Save
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default AddPosition;
