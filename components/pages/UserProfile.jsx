/* eslint-disable react/prop-types */
import React from 'react';
import dayjs from 'dayjs';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import UserAvatar from '../ui/UserAvatar';
import Button from '../ui/Button';
import Post from '../ui/Post';
import Comment from '../ui/Comment';
import SettingsModal from '../ui/SettingsModal';
import { makeRequest } from '../../lib/helpers';
import { useAuthContext } from '../AuthProvider';

const UserProfilePage = ({ data, likedPosts, comments }) => {
  const { t } = useTranslation();
  const user = useAuthContext().data;
  const [page, setPage] = React.useState(0);
  const [commentsData, setCommentsData] = React.useState(comments);
  const [showSettings, setShowSettings] = React.useState(false);

  const onDeleteComment = (commentId) => {
    if (!user) return;
    makeRequest(
      '/posts/delete-comment',
      'POST',
      JSON.stringify({ commentId }),
    ).then((res) => {
      if (res.errorCode === undefined && res.deleted === true) {
        const commentsArray = commentsData.filter(
          (comment) => comment._id !== commentId,
        );
        setCommentsData(commentsArray);
      }
    });
  };

  return (
    <div className="flex lg:flex-row flex-col pt-7 w-11/12 max-w-screen-xl mx-auto">
      {showSettings === true && (
        <SettingsModal userData={data} onClose={() => setShowSettings(false)} />
      )}
      <div className="flex flex-col lg:mr-20">
        <div className="flex flex-col mb-2 items-center">
          <UserAvatar
            src={data.profileImg}
            username={data.displayName}
            customSize="124px"
          />
          <span className="text-lg mt-2 font-bold">{data.displayName}</span>
        </div>
        <div className="lg:w-40 w-full text-center mb-5 break-words">
          <span className="text-sm mb-5 text-gray-500">{data.bio}</span>
        </div>
        <span className="text-xs lg:text-left text-center mb-2 font-semibold">
          {t('profilePage.date')}: {dayjs(data.createdAt).format('DD/MM/YYYY')}
        </span>
        <span className="text-xs lg:text-left text-center mb-5 font-semibold">
          {t('profilePage.point')}: 200
        </span>
        {user?.moderator === true && (
          <Button
            onClick={() => setShowSettings(true)}
            extraClassName="lg:mb-0 mb-5"
          >
            {t('profilePage.edit')}
          </Button>
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full mb-5">
          <span className="text-sm font-semibold text-accent">
            {t('profilePage.liked')}
          </span>
        </div>
        <div className="flex flex-wrap mb-2 w-full">
          {likedPosts.length < 1 && (
            <p className="text-sm mb-2 font-semibold">
              {t('profilePage.nothing')}
            </p>
          )}
          {likedPosts.slice(page * 3, (page + 1) * 3).map((post) => (
            <Post key={post._id} data={post} />
          ))}
        </div>
        {likedPosts.length > 3 && (
          <div className="flex xs:px-0 px-2 w-full mb-5">
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={Math.ceil(likedPosts.length / 3)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              initialPage={0}
              onPageChange={({ selected }) => setPage(selected)}
              forcePage={page}
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        )}
        <div className="flex w-full">
          <span className="text-sm font-semibold text-accent">
            {t('profilePage.comments')}
          </span>
        </div>
        <div className="flex flex-col w-full h-96 hide-scrollbar overflow-y-auto">
          {commentsData.length < 1 && (
            <p className="text-sm font-semibold">{t('profilePage.nothing')}</p>
          )}
          {commentsData.map((comment) => (
            <div className="flex flex-col">
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
                userDetails={data}
                onDeleteComment={(commentId) => onDeleteComment(commentId)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
