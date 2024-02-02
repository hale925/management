import React, { useEffect, useState } from 'react';
import { Button, TextInput, Textarea, Group } from '@mantine/core';
import { updatePosition, getPositions } from './positionApi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPositionsSuccess } from './positionSlice';
import { useParams, useNavigate } from 'react-router-dom';
import SearchableCombobox from './SearchableCombobox';

function EditPosition() {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.positions.positions);
  const { positionId } = useParams();
  const navigate = useNavigate();
  console.log('path id: ', positionId);

  const list = positions.map((pos) => (pos ? pos.name : null)).filter(Boolean);
  list.unshift('null');

  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const { register, handleSubmit, setValue: setFormValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const existingPositionData = positions.find((position) => position.id === positionId);

    if (existingPositionData) {
      setFormValue('id', existingPositionData.id);
      setFormValue('name', existingPositionData.name);
      setFormValue('description', existingPositionData.description);
      setFormValue('parentId', existingPositionData.parentId || ''); // Handle null parentId
    }
  }, [positionId, positions, setFormValue]);

  const onSubmitHandler = async (data) => {
    try {
      await updatePosition(positionId, { ...data, parentId: selectedValue || null });

      const updatedPositions = await getPositions();
      dispatch(fetchPositionsSuccess(updatedPositions));

      console.log('Position updated successfully!');
    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

  const onClearForm = () => {
    reset();
    setSearch('');
    setSelectedValue('');
  };

  const onCancelEdit = () => {
    navigate(`/positions/${positionId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="bg-gray-700 text-bold text-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2">
        <TextInput
          label="Position ID"
          placeholder="Enter Position ID"
          {...register('id')}
          classNames={{
            input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
          }}
        />
        <TextInput
          label="Position Name"
          placeholder="Enter Position Name"
          {...register('name', { required: 'Please provide Position Name' })}
          error={errors.name}
          classNames={{
            input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
          }}
        />
        <SearchableCombobox
          list={list}
          value={selectedValue}
          setValue={setSelectedValue}
          search={search}
          setSearch={setSearch}
        />
        <Textarea
          label="Description"
          placeholder="Enter the description"
          rows={10}
          classNames={{
            input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 ',
          }}
          {...register('description')}
        />

        <Group position="right">
          <Button type="button" color="gray" onClick={onClearForm} className="mr-4">
            Clear
          </Button>
          <Button type="button" color="red" onClick={onCancelEdit} className="mr-4">
            Cancel
          </Button>
          <Button type="submit" 
          className="bg-green-500 hover:bg-white-600 text-white hover:text-gray font-bold py-2 px-4 rounded">
            Save
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default EditPosition;
