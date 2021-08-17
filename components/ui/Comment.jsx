import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuthContext } from '../AuthProvider';
import UserAvatar from './UserAvatar';
import TrashIcon from '../icons/Trash';
import { makeRequest } from '../../lib/helpers';

const Comment = ({ data }) => {
  const userData = useAuthContext().data;
  const [senderDetails, setSenderDetails] = React.useState({});
  React.useEffect(() => {
    let isMounted = true;
    makeRequest(`/users/get-user?id=${data.senderId}`, 'GET').then((res) => {
      if (res) {
        if (isMounted) setSenderDetails(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [data]);
  console.log(senderDetails.profileImg);
  return (
    <div className="flex w-full p-2 rounded-lg mt-5 border">
      <Link href={`/user/${data.senderId}`}>
        <a>
          <UserAvatar
            src={senderDetails?.profileImg}
            username={senderDetails?.displayName}
          />
        </a>
      </Link>
      <div className="flex flex-col ml-2 justify-center w-full">
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center">
            <Link href={`/user/${data.senderId}`}>
              <a className="mr-2 text-md font-bold">
                {senderDetails?.displayName}
              </a>
            </Link>
            <span className="text-sm text-gray-500">
              {moment(data.createdAt).fromNow()}
            </span>
          </div>
          {userData?.moderator === true && (
            <TrashIcon className="cursor-pointer" />
          )}
        </div>
        <p className="text-sm text-gray-500">{data.message}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  data: {
    _id: PropTypes.number.isRequired,
    senderId: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
  }.isRequired,
};

export default Comment;
