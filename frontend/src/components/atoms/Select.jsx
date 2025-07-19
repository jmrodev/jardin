import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/atoms/select.css';

const Select = ({ label, name, value, onChange, options, placeholder, required, ...props }) => {
  return (
    <div className="select-container">
      {label && <label htmlFor={name} className="select-label">{label}{required && ' *'}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="select-element"
        required={required}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

Select.defaultProps = {
  label: '',
  placeholder: '',
  required: false,
};

export default Select; 