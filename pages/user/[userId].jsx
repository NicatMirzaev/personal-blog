/* eslint-disable react/prop-types */
import React from 'react';
import { makeRequest } from '../../lib/helpers';
import Layout from '../../components/Layout';
import UserProfilePage from '../../components/pages/UserProfile';

const UserProfile = ({ data, likedPosts, comments }) => (
  <Layout title="Profile">
    <UserProfilePage data={data} comments={comments} likedPosts={likedPosts} />
  </Layout>
);

export async function getServerSideProps({ query }) {
  const { userId } = query;
  const data = await makeRequest(`/users/get-user?id=${userId}`, 'GET');
  const likedPosts = await makeRequest(
    `/users/get-user-liked-posts?userId=${userId}`,
    'GET',
  );
  const comments = await makeRequest(
    `/users/get-user-comments?userId=${userId}`,
    'GET',
  );
  return { props: { data, likedPosts, comments } };
}

export default UserProfile;
