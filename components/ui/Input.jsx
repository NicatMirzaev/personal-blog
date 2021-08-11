import PropTypes from 'prop-types';

const Input = ({ className, textarea, error, transparent, ...props }) => {
  // const bg = transparent ? 'bg-transparent' : 'bg-gray-500';
  const ring = error ? 'ring-1 ring-red-500' : '';
  const classNames = `w-full py-2 px-3 text-grey-darker shadow appearance-none border border-borderColor focus:outline-none rounded ${ring} ${className} `;

  return textarea ? (
    <textarea className={classNames} {...props} />
  ) : (
    <input className={classNames} {...props} />
  );
};

Input.defaultProps = {
  className: '',
  textarea: false,
  error: false,
  transparent: false,
};

Input.propTypes = {
  className: PropTypes.string,
  textarea: PropTypes.bool,
  error: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default Input;
