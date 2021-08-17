/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React from 'react';
import { makeRequest } from '../../lib/helpers';
import { useAuth } from '../../components/AuthProvider';
import PostDetails from '../../components/pages/PostDetails';

const Post = ({ data, otherPosts }) => {
  const dispatch = useAuth();
  const [postData, setPostData] = React.useState(data);
  const handleLike = () => {
    makeRequest(
      '/posts/like-post',
      'POST',
      JSON.stringify({ postId: data._id }),
    ).then((response) => {
      if (response.errorCode === undefined) {
        dispatch({
          type: 'SET_USER',
          payload: { loading: false, data: response.user },
        });
        setPostData(response.post);
      }
    });
  };
  return (
    <PostDetails
      post={postData}
      otherPosts={otherPosts}
      handleLike={handleLike}
    />
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;
  const data = await makeRequest(`/posts/get-post-by-slug?slug=${slug}`, 'GET');
  let otherPosts = await makeRequest(
    `/posts/get-posts-by-category?category=${data.category}`,
  );
  otherPosts = otherPosts.filter((post) => post._id !== data._id);
  return { props: { data, otherPosts } };
}

export default Post;
