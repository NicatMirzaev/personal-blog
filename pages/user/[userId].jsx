/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { makeRequest } from '../../lib/helpers';
import ErrorModal from '../../components/ui/ErrorModal';
import Layout from '../../components/Layout';
import UserProfilePage from '../../components/pages/UserProfile';

const UserProfile = ({ data, likedPosts, comments }) => {
  const { t } = useTranslation();
  const router = useRouter();
  if (data.errorCode !== undefined) {
    return (
      <ErrorModal error={t(`errorCodes.${data.errorCode}`)} onClose={() => router.push('/')} />
    );
  }
  return (
    <Layout title="Profile" navbarMaxWidth="1280px">
      <UserProfilePage data={data} comments={comments} likedPosts={likedPosts} />
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const { userId } = query;
  const data = await makeRequest(`/users/get-user?id=${userId}`, 'GET');
  let likedPosts = [];
  let comments = [];
  if (data.errorCode === undefined) {
    likedPosts = await makeRequest(`/users/get-user-liked-posts?userId=${userId}`, 'GET');
    comments = await makeRequest(`/users/get-user-comments?userId=${userId}`, 'GET');
  }
  return { props: { data, likedPosts, comments } };
}

export default UserProfile;
