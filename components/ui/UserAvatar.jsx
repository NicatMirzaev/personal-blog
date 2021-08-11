/* eslint-disable object-curly-newline */
/* eslint-disable indent */
import { useState } from 'react';
import PropTypes from 'prop-types';

const avatarSize = {
  default: '32px',
  lg: '40px',
  md: '28px',
  sm: '24px',
  xs: '20px',
  xxs: '18px',
};

const UserAvatar = (props) => {
  const [isError, setError] = useState(false);
  const { src, size, extraClassName, hover, username } = props;
  return (
    <div
      className={`relative cursor-pointer inline-block ${extraClassName}`}
      style={{
        width: avatarSize[size],
        height: avatarSize[size],
      }}
      {...props}
    >
      <img
        alt={username ? `${username}-s-avatar` : 'your-avatar'}
        className="rounded-full w-full h-full object-cover"
        onError={() => setError(true)}
        src={
          isError
            ? `https://ui-avatars.com/api/${
                username ? `&name=${username}` : '&name'
              }&rounded=true&background=B23439&bold=true&color=FFFFFF`
            : src
        }
      />
      {hover && (
        <div className="bg-primary-900 hover:opacity-20 transition duration-200 opacity-0 absolute w-full h-full top-0 left-0 rounded-full" />
      )}
    </div>
  );
};

UserAvatar.defaultProps = {
  src: '',
  size: 'default',
  extraClassName: '',
  hover: true,
  username: '',
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(avatarSize)),
  extraClassName: PropTypes.string,
  hover: PropTypes.bool,
  username: PropTypes.string,
};

export default UserAvatar;
