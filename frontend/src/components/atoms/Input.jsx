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
  id,
  name,
  className = '',
  as: Component = 'input',
  ...props
}) => {
  const inputId = id || name;
  const inputClasses = [
    'input-element', // Usar una clase más genérica
    error && 'error',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      <Component
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