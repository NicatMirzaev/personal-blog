import React from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../components/AuthProvider';
import CreatePostPage from '../components/pages/CreatePost';
import Layout from '../components/Layout';

const CreatePost = () => {
  const user = useAuthContext();
  const router = useRouter();

  if (!user.data && user.loading === false) {
    router.push('/');
    return null;
  }
  return (
    <Layout title="Create Post">
      <CreatePostPage />
    </Layout>
  );
};

export default CreatePost;
