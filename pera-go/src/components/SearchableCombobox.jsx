
import React from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';

const SearchableCombobox = ({ list, value, setValue, search, setSearch }) => {
    let options;

  const shouldFilterOptions = list.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? list.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    : list;

  if (filteredOptions.length === 0) {
    
    options = [
      <Combobox.Option value="nothing" key="nothing">
        Nothing is found
      </Combobox.Option>,
    ];
  } else {
    options = filteredOptions.map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ));
  }
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox 
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
      
    >
      <Combobox.Target>
        <InputBase
          rightSection={<IconSelector style={{ fontSize: '3px' }} />}
          value={search}
          label="Parent Position"
          classNames={{
            input: 'w-full md:w-2/3 lg:w-1/2 focus:outline-none bg-gray-600 pl-8',
            
          }}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder="Search or Select Parent Position "
          rightSectionPointerEvents="none"
        />
        
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options className='bg-gray-800'
          style={{
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: 'black',
            color: 'white',
            
            textAlign: 'center'
          }}
        >
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchableCombobox;
