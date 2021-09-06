import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import EditPostPage from '../../components/pages/EditPost';
import Layout from '../../components/Layout';
import { useAuthContext } from '../../components/AuthProvider';
import { makeRequest } from '../../lib/helpers';

const EditPost = ({ data }) => {
  const user = useAuthContext();
  const router = useRouter();

  if (
    (!user.data && user.loading === false) ||
    data.errorCode !== undefined ||
    (user.loading === false && user.data?.moderator !== true)
  ) {
    router.push('/');
    return null;
  }

  return (
    <Layout title="Edit Post">
      <EditPostPage postData={data} />
    </Layout>
  );
};

EditPost.propTypes = {
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

export async function getServerSideProps({ query }) {
  const { postId } = query;
  const data = await makeRequest(`/posts/get-post-by-id?id=${postId}`, 'GET');
  if (data.errorCode === undefined && data.pollOptions) {
    data.pollOptions = Object.keys(data.pollOptions);
  }
  return { props: { data } };
}

export default EditPost;
