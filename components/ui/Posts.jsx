import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const Posts = ({ posts }) => (
  <div className="flex flex-wrap w-full xl:justify-center justify-start">
    {posts.map((post) => (
      <Post key={post.id} data={post} />
    ))}
  </div>
);

/* eslint-disable react/forbid-prop-types */
Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
