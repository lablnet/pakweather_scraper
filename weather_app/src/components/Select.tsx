import React from 'react';
import ReactSelect from 'react-select';
import { Location } from '../utils/api';

interface SelectProps {
  options: Location[];
  onChange: (value: string | null) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

interface OptionType {
  value: string;
  label: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  isLoading = false,
  placeholder = 'Search City',
  className = '',
}) => {
  const selectOptions: OptionType[] = options.map((location) => ({
    value: `${location.name}|${location.lat}|${location.lng}`,
    label: location.name,
  }));

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: '56px',
      border: state.isFocused ? '2px solid #3b82f6' : '2px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '&:hover': {
        border: '2px solid #93c5fd',
      },
      padding: '0 4px',
      fontSize: '18px',
      fontWeight: '500',
      backgroundColor: '#ffffff',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#6b7280',
      fontSize: '18px',
    }),
    input: (provided: any) => ({
      ...provided,
      fontSize: '18px',
      fontWeight: '500',
      color: '#374151',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      marginTop: '8px',
      zIndex: 9999,
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
        ? '#eff6ff'
        : '#ffffff',
      color: state.isSelected ? '#ffffff' : '#374151',
      padding: '12px 16px',
      fontSize: '16px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#374151',
      fontSize: '18px',
      fontWeight: '500',
    }),
    loadingIndicator: (provided: any) => ({
      ...provided,
      color: '#3b82f6',
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      color: '#6b7280',
      fontSize: '16px',
      padding: '12px',
    }),
  };

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    } else {
      onChange(null);
    }
  };

  return (
    <div className={className} style={{ position: 'relative', zIndex: 1 }}>
      <ReactSelect
        options={selectOptions}
        onChange={handleChange}
        isLoading={isLoading}
        placeholder={isLoading ? 'Loading cities...' : placeholder}
        isSearchable={true}
        isClearable={false}
        isDisabled={isLoading}
        styles={customStyles}
        classNamePrefix="react-select"
        noOptionsMessage={() => 'No cities found'}
        loadingMessage={() => 'Loading cities...'}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        menuPosition="fixed"
      />
    </div>
  );
};

export default Select;

