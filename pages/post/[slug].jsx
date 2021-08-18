/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React from 'react';
import { useRouter } from 'next/router';
import { makeRequest } from '../../lib/helpers';
import { useAuth, useAuthContext } from '../../components/AuthProvider';
import PostDetails from '../../components/pages/PostDetails';

const Post = ({ data, otherPosts, comments }) => {
  const dispatch = useAuth();
  const userData = useAuthContext().data;
  const router = useRouter();
  const [postData, setPostData] = React.useState(data);
  const [commentsData, setCommentsData] = React.useState(comments);
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
  const onComment = (message) => {
    if (!userData) return;
    const reqData = {
      senderId: userData._id,
      postId: data._id,
      message,
    };
    makeRequest('/posts/add-comment', 'POST', JSON.stringify(reqData)).then(
      (res) => {
        if (res.errorCode === undefined) {
          const commentsArray = commentsData;
          commentsArray.push(res.comment);
          commentsArray.sort((a, b) => b.createdAt - a.createdAt);
          setCommentsData(commentsArray);
          setPostData(res.post);
        }
      },
    );
  };

  const onDeleteComment = (commentId) => {
    if (!userData) return;
    makeRequest(
      '/posts/delete-comment',
      'POST',
      JSON.stringify({ commentId }),
    ).then((res) => {
      if (res.errorCode === undefined && res.deleted === true) {
        const commentsArray = commentsData.filter(
          (comment) => comment._id !== commentId,
        );
        setCommentsData(commentsArray);
      }
    });
  };

  const onDeletePost = () => {
    if (!userData) return;
    makeRequest(
      '/posts/delete-post',
      'POST',
      JSON.stringify({ postId: postData._id }),
    ).then((res) => {
      if (res.errorCode === undefined && res.deleted === true) {
        router.push('/');
      }
    });
  };
  return (
    <PostDetails
      post={postData}
      otherPosts={otherPosts}
      comments={commentsData}
      onComment={(message) => onComment(message)}
      onDeleteComment={(commentId) => onDeleteComment(commentId)}
      onDeletePost={onDeletePost}
      handleLike={handleLike}
    />
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;
  const data = await makeRequest(`/posts/get-post-by-slug?slug=${slug}`, 'GET');
  const comments = await makeRequest(
    `/posts/get-comments?postId=${data._id}`,
    'GET',
  );
  let otherPosts = await makeRequest(
    `/posts/get-posts-by-category?category=${data.category}`,
  );
  otherPosts = otherPosts.filter((post) => post._id !== data._id);
  return { props: { data, otherPosts, comments } };
}

export default Post;
