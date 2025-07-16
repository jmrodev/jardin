const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  label,
  id,
  name,
  className = '',
  ...props
}) => {
  const inputId = id || name;
  const inputClasses = [
    'input',
    error && 'error',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input; 