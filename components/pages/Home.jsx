/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../Layout';
import Footer from '../ui/Footer';
import Posts from '../ui/Posts';
import Button from '../ui/Button';

/* const posts = [
  {
    id: 1,
    slug: 'beyin-dijital-bir-bilgisayar-mi',
    imageSrc:
      'https://singularityhub.com/wp-content/uploads/2020/01/brain-1787622_1280-dopaminergic-neurons-reward-900x506.jpg',
    category: 'Yapay Zeka',
    publishDate: '05/08/2021',
    title: 'Beyin dijital bir bilgisayar mi?',
    shortContent:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text',
    viewCount: 150000,
    likeCount: 80105,
    commentCount: 36584,
  },
  {
    id: 2,
    slug: 'python-nedir',
    imageSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5Hx2eH68hKdOmG17tCcbu9yaLrkvl181tFZsTreJgKWmTyDb6',
    category: 'Yazılım',
    publishDate: '05/08/2021',
    title: 'Python nedir? Hello world!',
    shortContent:
      'Python, 1990 yılında Guido Van Rossum tarafından geliştirilen yazılması ve okunması oldukça kolay bir programlama dilidir.',
    viewCount: 703000,
    likeCount: 28000,
    commentCount: 11892,
  },
  {
    id: 3,
    slug: 'google-stadia-nedir',
    imageSrc:
      'https://www.pcgamesn.com/wp-content/uploads/2019/03/google-stadia-900x506.jpg',
    category: 'Teknoloji',
    publishDate: '06/08/2021',
    title: "Google Stadia nedir? Google Stadia Türkiye'\nye geliyor!",
    shortContent:
      'Uzun zamandır ülkemizde teknoloji meraklılarının merak ettiği ve takip ettiği Google Stadia Türkiye’ye serverlarını taşımaya hazırlanıyor. Peki nedir Google Stadia?',
    viewCount: 10000,
    likeCount: 4352,
    commentCount: 503,
  },
]; */

const Home = ({ popularPosts, latestPosts }) => {
  const { t } = useTranslation();
  console.log(popularPosts);
  console.log(latestPosts);
  return (
    <Layout title="Home">
      <div className="flex flex-col w-full h-full xs:pl-0 pl-4 pt-7 items-center">
        <p className="mb-5 text-sm font-medium ">{t('feed.popularPosts')}</p>
        <Posts posts={popularPosts} />
        <p className="mb-5 text-sm font-medium ">{t('feed.latestPosts')}</p>
        <Posts posts={latestPosts} />
        <div className="my-10 flex items-center justify-center w-full">
          <Button
            link="/discover"
            extraClassName="xs:w-1/2 w-full mr-4"
            color="primary"
          >
            {t('feed.discover')}
          </Button>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Home;
