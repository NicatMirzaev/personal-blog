/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import Footer from '../ui/Footer';
import Posts from '../ui/Posts';
import Button from '../ui/Button';

const Home = ({ popularPosts, latestPosts }) => {
  const { t } = useTranslation();

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

Home.propTypes = {
  popularPosts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
    }),
  ).isRequired,
  latestPosts: PropTypes.arrayOf(
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

export default Home;
