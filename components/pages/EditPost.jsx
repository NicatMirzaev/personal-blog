import React from 'react';
import slugify from 'react-slugify';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import { useRouter } from 'next/router';
import MarkdownEditor from '../ui/MarkdownEditor';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../AuthProvider';
import {
  makeRequest,
  categoryConvertTurkishToEnglish,
} from '../../lib/helpers';

const EditPostPage = ({ postData }) => {
  const { t } = useTranslation();
  const { data } = useAuthContext();
  const router = useRouter();
  const [content, setContent] = React.useState(postData?.content);
  const [loading, setLoading] = React.useState({ loading: false, error: '' });
  const categories = [
    t('categories.Science'),
    t('categories.Game'),
    t('categories.Technologie'),
    t('categories.Mobile'),
    t('categories.Software'),
  ];
  const [values, setValues] = React.useState({
    blogTitle: postData?.title,
    blogSlug: postData?.slug,
    blogImg: postData?.img,
    blogSummary: postData?.summary,
    blogCategory: postData?.category,
  });

  const handleChange = (e) => {
    if (e.target.name === 'blogTitle') {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        blogSlug: slugify(e.target.value),
      });
    } else setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategory = ({ value }) => {
    setValues({ ...values, blogCategory: value });
  };

  const handleSubmit = () => {
    const reqData = {
      postId: postData._id,
      title: values.blogTitle,
      slug: values.blogSlug,
      content,
      img: values.blogImg,
      summary: values.blogSummary,
      category: categoryConvertTurkishToEnglish(values.blogCategory),
    };
    setLoading({ loading: true, error: '' });
    makeRequest('/posts/update-post', 'POST', JSON.stringify(reqData)).then(
      (res) => {
        if (res.errorCode === undefined) {
          router.push(`/post/${postData.slug}`);
        } else {
          setLoading({
            loading: false,
            error: t(`errorCodes.${res.errorCode}`),
          });
        }
      },
    );
  };

  return (
    <div className="flex pt-7 flex-col md:w-8/12 w-full md:pt-7 p-2 h-full mx-auto">
      <p className="mb-5 text-base font-bold">Edit Post</p>
      <form>
        <label className="mb-5 text-xs font-medium" htmlFor="blogTitle">
          {t('createPost.title')}
        </label>
        <Input
          id="blogTitle"
          name="blogTitle"
          type="text"
          className="my-2"
          maxLength="100"
          value={values.blogTitle}
          onChange={handleChange}
          placeholder={t('createPost.title')}
        />
        <label className="mb-5 text-xs font-medium" htmlFor="blogSlug">
          {t('createPost.slug')}
        </label>
        <Input
          id="blogSlug"
          name="blogSlug"
          type="text"
          className="my-2"
          maxLength="40"
          value={values.blogSlug}
          onChange={handleChange}
          placeholder={t('createPost.slug')}
        />
        <label className="mb-5 text-xs font-medium" htmlFor="blogImg">
          {t('createPost.img')}
        </label>
        <Input
          id="blogImg"
          name="blogImg"
          type="text"
          className="my-2"
          value={values.blogImg}
          onChange={handleChange}
          placeholder={t('createPost.img')}
        />
        <p className="mb-5 mt-2 text-xs font-medium">
          {t('createPost.category')}
        </p>
        <Dropdown
          options={categories}
          value={values.blogCategory}
          onChange={handleCategory}
          placeholderClassName="text-xs font-bold text-black"
          arrowClassName="top-4"
          className="my-2 bg-white"
          placeholder="Select blog category"
        />
        <label className="mb-5 text-xs font-medium" htmlFor="blogSummary">
          {t('createPost.summary')}
        </label>
        <Input
          id="blogSummary"
          name="blogSummary"
          type="text"
          textarea
          value={values.blogSummary}
          onChange={handleChange}
          className="my-2"
          placeholder={t('createPost.summary')}
        />
        <MarkdownEditor value={content} setValue={setContent} />
        {loading.error.length > 0 && (
          <p className="my-2 text-xs font-bold text-red-500">{loading.error}</p>
        )}
        <Button
          onClick={handleSubmit}
          loading={loading.loading}
          extraClassName="mt-3 w-full"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

EditPostPage.propTypes = {
  postData: {
    _id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }.isRequired,
};

export default EditPostPage;
