/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';
const remarkGfm = dynamic(() => import('remark-gfm'), { ssr: false });
import Layout from '../Layout';
import ViewsIcon from '../icons/Views';
import HeartIcon from '../icons/Heart';
import MessageIcon from '../icons/Message';
import { kFormatter } from '../../lib/helpers';

const PostDetails = ({ post }) => {
  return (
    <Layout title={post.title}>
      <div className="flex w-full h-full pt-2 justify-center">
        <div className="hide-scrollbar flex flex-col w-3/5 h-full overflow-y-scroll border border-borderColor rounded bg-white">
          <img src={post.img} alt="post" className="w-full mb-5" />
          <div className="flex flex-col items-center w-full h-full p-2">
            <span className="mb-5 self-end text-xs font-semibold text-blue-500">
              {moment(post.createdAt).format('DD/MM/YYYY')}
            </span>
            <p className="mb-5 text-2xl font-semibold">{post.title}</p>
            <div className="flex w-full justify-center pb-3 items-center border-b border-borderColor mb-5">
              <div className="flex items-center mr-6">
                <ViewsIcon />
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(post.views)}
                </span>
              </div>
              <div className="flex items-center mr-6">
                <HeartIcon />
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(post.likes)}
                </span>
              </div>
              <div className="flex items-center">
                <MessageIcon />
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(post.comments)}
                </span>
              </div>
            </div>
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a target="_blank" style={{ color: '#0000EE' }} {...props} />
                ),
              }}
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Layout>
  );
};

PostDetails.propTypes = {
  post: {
    _id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }.isRequired,
};

export default PostDetails;
