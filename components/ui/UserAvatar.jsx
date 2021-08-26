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
  const [error, setError] = useState(false);
  const { src, size, extraClassName, customSize, hover, username } = props;
  return (
    <div
      className={`relative cursor-pointer inline-block ${extraClassName}`}
      style={{
        width: !customSize.length ? avatarSize[size] : customSize,
        height: !customSize.length ? avatarSize[size] : customSize,
      }}
      {...props}
    >
      <img
        alt={username ? `${username}-s-avatar` : 'your-avatar'}
        className="rounded-full w-full h-full object-cover"
        src={
          error || !src
            ? `https://ui-avatars.com/api/${
                username ? `&name=${username.split(' ').join('')}` : '&name'
              }&rounded=true&background=B23439&bold=true&color=FFFFFF`
            : src
        }
        onError={() => setError(true)}
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
  customSize: '',
  extraClassName: '',
  hover: true,
  username: '',
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  customSize: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(avatarSize)),
  extraClassName: PropTypes.string,
  hover: PropTypes.bool,
  username: PropTypes.string,
};

export default UserAvatar;
