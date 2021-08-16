import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useAuthContext } from '../AuthProvider';
import UserAvatar from './UserAvatar';
import TrashIcon from '../icons/Trash';

const Comment = () => {
  const { data } = useAuthContext();
  return (
    <div className="flex w-full p-2 rounded-lg mt-5 border">
      <Link href={`user/${data?._id}`}>
        <a>
          <UserAvatar src={data?.profileImg} username={data?.displayName} />
        </a>
      </Link>
      <div className="flex flex-col ml-2 justify-center w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link href={`user/${data?._id}`}>
              <a className="mr-2 text-md font-bold">{data?.displayName}</a>
            </Link>
            <span className="text-sm text-gray-500">
              {moment(data?.createdAt).fromNow()}
            </span>
          </div>
          {data?.moderator === true && <TrashIcon className="cursor-pointer" />}
        </div>
        <p className="text-sm text-gray-500">
          Gerçekten çok beğendim yazıyı, ellerine sağlık. Paylaşımlarının
          devamını bekliyorum.
        </p>
      </div>
    </div>
  );
};

export default Comment;
