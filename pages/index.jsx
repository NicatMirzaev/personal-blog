/* eslint-disable react/prop-types */
import React from 'react';
import { makeRequest } from '../lib/helpers';
import Home from '../components/pages/Home';

const Index = ({ popularPosts, latestPosts, latestComments }) => (
  <Home
    popularPosts={popularPosts}
    latestPosts={latestPosts}
    latestComments={latestComments}
  />
);

export async function getServerSideProps() {
  const popularPosts = await makeRequest('/posts/popular-posts', 'GET');
  const latestPosts = await makeRequest('/posts/latest-posts', 'GET');
  const latestComments = await makeRequest('/posts/get-latest-comments', 'GET');
  return { props: { popularPosts, latestPosts, latestComments } };
}

export default Index;
