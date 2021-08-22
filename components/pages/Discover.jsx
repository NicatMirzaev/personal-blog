/* eslint-disable react/prop-types */
import React from 'react';
import Dropdown from 'react-dropdown';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';
import {
  makeRequest,
  categoryConvertTurkishToEnglish,
} from '../../lib/helpers';
import { PER_PAGE } from '../../lib/constants';
import Search from '../icons/Search';
import CenterLoading from '../ui/CenterLoading';
import Post from '../ui/Post';
import Input from '../ui/Input';

const SearchResults = ({ t, page, data }) => {
  const { loading, posts } = data;

  if (loading === true) {
    return (
      <div className="flex w-full items-center justify-center">
        <CenterLoading />
      </div>
    );
  }
  if (!posts.length) {
    return (
      <div className="flex w-full items-center justify-center">
        <p className="text-xs font-bold">{t('Search.notFound')}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap w-full justify-center">
      {posts.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((post) => (
        <Post key={post._id} data={post} />
      ))}
    </div>
  );
};

const DiscoverPage = ({ posts }) => {
  const { t } = useTranslation();
  const categories = [
    t('categories.All'),
    t('categories.Science'),
    t('categories.Game'),
    t('categories.Technologie'),
    t('categories.Mobile'),
    t('categories.Software'),
  ];
  const [data, setData] = React.useState({ loading: false, posts });
  const [page, setPage] = React.useState(0);
  const [values, setValues] = React.useState({
    title: '',
    category: categories[0],
  });

  const getPosts = () => {
    setData({ ...data, loading: true });
    makeRequest(
      `/posts/get-posts?title=${
        values.title
      }&category=${categoryConvertTurkishToEnglish(values.category)}`,
      'GET',
    ).then((res) => {
      setData({ loading: false, posts: res });
      setPage(0);
    });
  };

  const debounced = useDebouncedCallback(getPosts, 500);

  const handleChange = (e) => {
    setValues({ ...values, title: e.target.value });
    debounced();
  };

  const handleCategory = ({ value }) => {
    setValues({ ...values, category: value });
    debounced();
  };

  return (
    <div className="flex flex-col pt-2 max-w-screen-xl lg:w-8/12 w-full mx-auto">
      <div className="flex sm:flex-row flex-col w-full lg:px-0 px-5 mb-5 items-center">
        <div className="flex sm:mr-6 mr-0 w-full items-center rounded-3xl px-2 bg-white">
          <Search />
          <Input
            style={{ borderRadius: '1.5rem' }}
            value={values.title}
            onChange={handleChange}
            applyBorder={false}
            placeholder={t('Search.search')}
          />
        </div>
        <Dropdown
          options={categories}
          value={values.category}
          onChange={handleCategory}
          placeholderClassName="text-xs font-bold text-black"
          arrowClassName="top-3.5"
          className="my-2 bg-white"
          placeholder="Select category"
        />
      </div>
      <SearchResults t={t} page={page + 1} data={data} />
      {data.posts.length > 0 && (
        <div className="flex w-full mt-2 justify-center items-center">
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={Math.ceil(data.posts.length / PER_PAGE)}
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
    </div>
  );
};

DiscoverPage.propTypes = {
  posts: PropTypes.arrayOf(
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

export default DiscoverPage;
