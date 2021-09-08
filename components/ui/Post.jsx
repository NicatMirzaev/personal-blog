import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ViewsIcon from '../icons/Views';
import HeartIcon from '../icons/Heart';
import MessageIcon from '../icons/Message';
import { kFormatter } from '../../lib/helpers';
import { useAuthContext } from '../AuthProvider';

const Post = ({ data }) => {
  const { t } = useTranslation();
  const userData = useAuthContext().data;
  return (
    <div className="flex flex-col xs:w-60 w-54 rounded border-solid border border-borderColor bg-white xs:mr-5 xs:mx-0 mx-2 mb-5">
      <Link href={`/post/${data.slug}`}>
        <a>
          <img src={data.img} alt="post" className="w-full" />
          <div className="flex flex-col w-full p-5">
            <div className="flex w-full justify-between items-center mb-2">
              <span className="text-xs font-semibold text-blue-600 font-sans">
                {t(`categories.${data.category}`)}
              </span>
              <span className="text-xs font-semibold text-gray-500">
                {dayjs(data.createdAt).format('DD/MM/YYYY')}
              </span>
            </div>
            <p className="mb-2 text-base font-bold">{data.title}</p>
            <p className="text-sm font-medium text-gray-500 mb-5">{data.summary}</p>
            <div className="flex items-center w-full">
              <div className="flex items-center mr-6">
                <ViewsIcon />
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(data.views)}
                </span>
              </div>
              <div className="flex items-center mr-6">
                {userData?.likes?.includes(data._id) === true ? (
                  <HeartIcon fill="red" stroke="red" />
                ) : (
                  <HeartIcon />
                )}
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(data.likes)}
                </span>
              </div>
              <div className="flex items-center">
                <MessageIcon />
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(data.comments)}
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

Post.propTypes = {
  data: {
    _id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }.isRequired,
};

export default Post;
