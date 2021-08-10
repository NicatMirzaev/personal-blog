import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const sizeClassnames = {
  big: 'py-2 px-6 text-sm rounded-lg',
  small: 'px-2 py-1 text-sm rounded-md',
  tiny: 'px-1 text-sm rounded-5',
};

const colorClassnames = {
  primary:
    'text-white bg-accent transition duration-200 ease-in-out hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover',
  secondary:
    'text-white bg-primary-700 hover:bg-primary-600 disabled:text-primary-300',
  'secondary-800':
    'text-white bg-primary-800 hover:bg-primary-600 disabled:text-primary-300',
  'primary-300':
    'text-white bg-primary-700 hover:bg-primary-600 disabled:text-primary-300',
  transparent: 'text-gray-600 bg-transparent',
  'accent-secondary':
    'text-white bg-secondary hover:bg-secondary-washed-out disabled:text-secondary-washed-out',
};

const Button = ({
  children,
  size,
  color,
  disabled,
  link,
  loading,
  icon,
  extraClassName,
  transition,
  ...props
}) => (
  <button
    type="button"
    disabled={disabled || loading}
    className={`flex outline-none focus:ring-4 disabled:cursor-default focus:ring-${color} ${
      sizeClassnames[size]
    } ${transition ? 'transition duration-200 ease-in-out' : ''} ${
      colorClassnames[color]
    } font-bold flex items-center justify-center ${extraClassName}`}
    onClick={() => {
      if (link.length > 0) {
        window.location.href = link;
      }
    }}
    {...props}
  >
    <span className={loading ? 'opacity-0' : 'flex items-center'}>
      {icon ? <span className="mr-2 items-center">{icon}</span> : null}
      {children}
    </span>
    {loading ? (
      <span className="absolute">
        <Spinner size={size === 'small' ? '2' : '4'} />
      </span>
    ) : null}
  </button>
);

Button.defaultProps = {
  size: 'big',
  color: 'primary',
  link: '',
  disabled: false,
  loading: false,
  icon: '',
  extraClassName: '',
  transition: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(Object.keys(sizeClassnames)),
  color: PropTypes.oneOf(Object.keys(colorClassnames)),
  link: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  extraClassName: PropTypes.string,
  transition: PropTypes.string,
};

export default Button;
