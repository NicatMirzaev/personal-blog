/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeRequest } from '../../lib/helpers';
import Layout from '../Layout';
import Comment from '../ui/Comment';
import Posts from '../ui/Posts';
import Button from '../ui/Button';
import Footer from '../ui/Footer';

const Home = ({ popularPosts, latestPosts, latestComments }) => {
  const { t } = useTranslation();
  const [commentsData, setCommentsData] = React.useState(latestComments);

  const onDeleteComment = (commentId) => {
    makeRequest('/posts/delete-comment', 'POST', JSON.stringify({ commentId })).then((res) => {
      if (res.errorCode === undefined && res.deleted === true) {
        const commentsArray = commentsData.filter((comment) => comment._id !== commentId);
        setCommentsData(commentsArray);
      }
    });
  };

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
            extraClassName="xs:w-1/2 w-full mr-4 max-w-screen-lg"
            color="primary"
          >
            {t('feed.discover')}
          </Button>
        </div>
        {commentsData.length > 0 && (
          <p className="mb-5 text-sm font-medium ">{t('feed.latestComments')}</p>
        )}
        {commentsData.map((comment) => (
          <div className="flex flex-col items-center max-w-screen-md w-full mb-5">
            {comment.postSlug && (
              <Link href={`/post/${comment.postSlug}`}>
                <a className="w-max text-xs text-blue-500 mt-5 font-semibold">
                  » {comment.postTitle}
                </a>
              </Link>
            )}
            <Comment
              key={comment._id}
              data={comment}
              onDeleteComment={(commentId) => onDeleteComment(commentId)}
            />
          </div>
        ))}
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
  latestComments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      senderId: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Home;
