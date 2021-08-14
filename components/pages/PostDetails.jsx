import React from 'react';
import PropTypes from 'prop-types';

const PostDetails = ({ post }) => <div>{post.title}</div>;

PostDetails.propTypes = {
  post: {
    _id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }.isRequired,
};

export default PostDetails;
