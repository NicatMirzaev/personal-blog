import React from 'react';
import PropTypes from 'prop-types';
import { makeRequest } from '../lib/helpers';
import DiscoverPage from '../components/pages/Discover';
import Layout from '../components/Layout';

const Discover = ({ posts }) => {
  return (
    <Layout title="Discover">
      <DiscoverPage posts={posts} />
    </Layout>
  );
};

Discover.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export async function getServerSideProps() {
  const posts = await makeRequest('/posts/get-posts', 'GET');
  return { props: { posts } };
}

export default Discover;
