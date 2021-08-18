/* eslint-disable arrow-body-style */
import dynamic from 'next/dynamic';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Layout from '../Layout';
import Button from '../ui/Button';
import LoginModal from '../ui/LoginModal';
import Input from '../ui/Input';
import ViewsIcon from '../icons/Views';
import HeartIcon from '../icons/Heart';
import MessageIcon from '../icons/Message';
import EditIcon from '../icons/Edit';
import TrashIcon from '../icons/Trash';
import { kFormatter } from '../../lib/helpers';
import Post from '../ui/Post';
import Comment from '../ui/Comment';
import { useAuthContext } from '../AuthProvider';

// eslint-disable-next-line react/prop-types
const MakeComment = ({ openModal, onComment }) => {
  const { data } = useAuthContext();
  const { t } = useTranslation();
  const [message, setMessage] = React.useState('');
  if (!data) {
    return (
      <div className="flex p-5 w-full border border-red-500 bg-red-100">
        {t('postDetails.youMust')}
        <span
          onClick={openModal}
          className="cursor-pointer px-2 text-md font-medium text-blue-500"
        >
          {t('postDetails.signin')}
        </span>{' '}
        {t('postDetails.toMake')}
      </div>
    );
  }
  return (
    <div className="flex flex-col p-5 w-full border border-borderColor bg-blue-100">
      <p className="mb-5 text-md font-bold">{t('postDetails.makeComment')}</p>
      <Input
        textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t('postDetails.writeSomething')}
      />
      <Button onClick={() => onComment(message)} extraClassName="mt-5">
        {t('postDetails.send')}
      </Button>
    </div>
  );
};

const PostDetails = ({ post, otherPosts, comments, onComment, handleLike }) => {
  const { data } = useAuthContext();
  const { t } = useTranslation();
  const router = useRouter();
  const remarkGfm = dynamic(() => import('remark-gfm'), { ssr: false });
  const [loginModal, setLoginModal] = React.useState(false);

  const onClickLike = () => {
    if (!data) {
      return setLoginModal(true);
    }
    return handleLike();
  };
  if (post.errorCode !== undefined) {
    router.push('/');
    return null;
  }
  return (
    <Layout title={post.title}>
      {loginModal === true && (
        <LoginModal onClose={() => setLoginModal(false)} />
      )}
      <div className="flex w-full pt-2 justify-center">
        <div className="flex flex-col md:w-3/5 w-full m-2 h-full border border-borderColor rounded bg-white">
          <img src={post.img} alt="post" className="w-full mb-5" />
          <div className="flex flex-col w-full h-full p-2">
            <div className="flex items-center self-end mb-5">
              {data?.moderator === true && (
                <EditIcon className="mr-2 cursor-pointer" />
              )}
              {data?.moderator === true && (
                <TrashIcon className="mr-2 cursor-pointer" />
              )}
              <span className="text-xs font-semibold text-blue-500">
                {moment(post.createdAt).format('DD/MM/YYYY')}
              </span>
            </div>
            <p className="mb-5 text-center text-2xl font-semibold">
              {post.title}
            </p>
            <div className="flex w-full justify-center pb-3 items-center border-b border-borderColor mb-5">
              <div className="flex cursor-pointer hover:bg-gray-100 p-2 rounded-full items-center mr-6">
                <ViewsIcon />
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(post.views)}
                </span>
              </div>
              <div
                onClick={onClickLike}
                className="flex cursor-pointer hover:bg-gray-100 p-2 rounded-full items-center mr-6"
              >
                {data?.likes.includes(post._id) === true ? (
                  <HeartIcon fill="red" stroke="red" />
                ) : (
                  <HeartIcon />
                )}
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(post.likes)}
                </span>
              </div>
              <div className="flex cursor-pointer hover:bg-gray-100 p-2 rounded-full items-center">
                <MessageIcon />
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {kFormatter(post.comments)}
                </span>
              </div>
            </div>
            <ReactMarkdown
              components={{
                a: ({ ...props }) => (
                  <a target="_blank" style={{ color: '#0000EE' }} {...props} />
                ),
                p: ({ ...props }) => (
                  <p style={{ marginBottom: '10px' }} {...props} />
                ),
              }}
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
            <div className="mt-10 flex flex-col w-full">
              <div className="mb-5 pb-2 border-b border-borderColor">
                <p className="text-md font-bold ">
                  {t('postDetails.comments')}
                </p>
              </div>
              <MakeComment
                onComment={(message) => onComment(message)}
                openModal={() => setLoginModal(true)}
              />
              {comments.map((comment) => (
                <Comment key={comment._id} data={comment} />
              ))}
            </div>
          </div>
        </div>
        <div className="md:flex hidden flex-col ml-24 h-full">
          <p className="mb-5 text-sm font-medium ">
            {t('postDetails.otherPosts')}
          </p>
          {otherPosts.map((postData) => (
            <Post key={postData._id} data={postData} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

PostDetails.propTypes = {
  handleLike: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
  post: {
    _id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }.isRequired,
  otherPosts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
    }),
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      senderId: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default PostDetails;
