/* eslint-disable react/prop-types */
import React from 'react';
import { makeRequest } from '../lib/helpers';
import Home from '../components/pages/Home';

const Index = ({ popularPosts, latestPosts }) => (
  <Home popularPosts={popularPosts} latestPosts={latestPosts} />
);

export async function getServerSideProps() {
  const popularPosts = await makeRequest('/posts/popular-posts', 'GET');
  const latestPosts = await makeRequest('/posts/latest-posts', 'GET');
  return { props: { popularPosts, latestPosts } };
}

export default Index;
