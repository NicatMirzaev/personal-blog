import React from 'react';
import { makeRequest } from '../lib/helpers';
import Home from '../components/pages/Home';

const Index = ({ popularPosts, latestPosts }) => (
  <Home popularPosts={popularPosts} latestPosts={latestPosts} />
);

Index.getInitialProps = async () => {
  const popularPosts = await makeRequest('/posts/popular-posts', 'GET');
  const latestPosts = await makeRequest('/posts/latest-posts', 'GET');
  return { popularPosts, latestPosts };
};

export default Index;
