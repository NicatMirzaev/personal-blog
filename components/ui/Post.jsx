import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ViewsIcon from '../icons/Views';
import HeartIcon from '../icons/Heart';
import MessageIcon from '../icons/Message';
import { kFormatter } from '../../lib/helpers';

const Post = ({ data }) => (
  <Link href={`/post/${data.slug}`}>
    <a>
      <div className="flex flex-col xs:w-60 w-54 rounded border-solid border border-borderColor bg-white mr-5 mb-5">
        <img src={data.imageSrc} alt="post" className="w-full" />
        <div className="flex flex-col w-full p-5">
          <div className="flex w-full justify-between items-center mb-2">
            <span className="text-xs font-semibold text-blue-600 font-sans">
              {data.category}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {data.publishDate}
            </span>
          </div>
          <p className="mb-2 text-base font-bold">{data.title}</p>
          <p className="text-sm font-medium text-gray-500 mb-5">
            {data.shortContent}
          </p>
          <div className="flex items-center w-full">
            <div className="flex items-center mr-6">
              <ViewsIcon />
              <span className="ml-2 text-xs font-normal text-gray-500">
                {kFormatter(data.viewCount)}
              </span>
            </div>
            <div className="flex items-center mr-6">
              <HeartIcon />
              <span className="ml-2 text-xs font-normal text-gray-500">
                {kFormatter(data.likeCount)}
              </span>
            </div>
            <div className="flex items-center">
              <MessageIcon />
              <span className="ml-2 text-xs font-normal text-gray-500">
                {kFormatter(data.commentCount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  </Link>
);

Post.propTypes = {
  data: {
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortContent: PropTypes.string.isRequired,
    viewCount: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }.isRequired,
};

export default Post;
