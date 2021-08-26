import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useAuth, useAuthContext } from '../AuthProvider';
import LoginModal from './LoginModal';
import UserAvatar from './UserAvatar';
import TrashIcon from '../icons/Trash';
import HeartIcon from '../icons/Heart';
import { makeRequest, kFormatter } from '../../lib/helpers';

dayjs.extend(relativeTime);
// eslint-disable-next-line react/prop-types
const Comment = ({ userDetails, data, onDeleteComment }) => {
  const userData = useAuthContext().data;
  const dispatch = useAuth();
  const [senderDetails, setSenderDetails] = React.useState(userDetails);
  const [commentData, setCommentData] = React.useState(data);
  const [loginModal, setLoginModal] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    if (senderDetails === undefined) {
      makeRequest(`/users/get-user?id=${data.senderId}`, 'GET').then((res) => {
        if (res) {
          if (isMounted) setSenderDetails(res);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [data, senderDetails]);

  const handleLike = () => {
    if (!userData) {
      setLoginModal(true);
      return;
    }
    makeRequest(
      '/posts/like-comment',
      'POST',
      JSON.stringify({ commentId: data._id }),
    ).then((res) => {
      if (res.errorCode === undefined) {
        setCommentData(res.comment);
        dispatch({
          type: 'SET_USER',
          payload: { loading: false, data: res.user },
        });
      }
    });
  };

  if (senderDetails === undefined) return null;

  return (
    <div className="flex w-full p-2 rounded-lg mt-5 border bg-white">
      {loginModal === true && (
        <LoginModal onClose={() => setLoginModal(false)} />
      )}
      <Link href={`/user/${commentData.senderId}`}>
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
            <Link href={`/user/${commentData.senderId}`}>
              <a className="mr-2 text-md font-bold">
                {senderDetails?.displayName}
              </a>
            </Link>
            <span className="text-sm text-gray-500">
              {dayjs(commentData.createdAt).fromNow()}
            </span>
          </div>
          {userData?.moderator === true || userData?._id === data.senderId ? (
            <TrashIcon
              onClick={() => onDeleteComment(commentData._id)}
              className="cursor-pointer"
            />
          ) : null}
        </div>
        <p className="text-sm text-gray-500">{commentData.message}</p>
        <div className="flex w-full justify-end items-center">
          <div
            onClick={handleLike}
            className="flex cursor-pointer hover:bg-gray-100 p-2 rounded-full items-center mr-2"
          >
            {userData?.likes.includes(commentData._id) === true ? (
              <HeartIcon fill="red" stroke="red" />
            ) : (
              <HeartIcon />
            )}
            <span className="ml-2 text-xs font-normal text-gray-500">
              {kFormatter(commentData.likes)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  onDeleteComment: PropTypes.func.isRequired,
  data: {
    _id: PropTypes.number.isRequired,
    senderId: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
  }.isRequired,
};

export default Comment;
