import React from 'react';
import Dropdown from 'react-dropdown';
import slugify from 'react-slugify';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Input from '../ui/Input';
import Button from '../ui/Button';
import MarkdownEditor from '../ui/MarkdownEditor';
import { getValue } from '../../lib/store';
import TrashIcon from '../icons/Trash';
import {
  makeRequest,
  categoryConvertTurkishToEnglish,
} from '../../lib/helpers';

const CreatePostPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [content, setContent] = React.useState('');
  const [poll, setPoll] = React.useState({
    active: false,
    question: '',
    options: [],
  });
  const [option, setOption] = React.useState('');
  const categories = [
    t('categories.Science'),
    t('categories.Game'),
    t('categories.Technologie'),
    t('categories.Mobile'),
    t('categories.Software'),
  ];
  const [values, setValues] = React.useState({
    blogTitle: '',
    blogSlug: '',
    blogImg: '',
    blogSummary: '',
    blogCategory: categories[0],
  });

  const [loading, setLoading] = React.useState({ loading: false, error: '' });

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
    setLoading({ loading: true, error: '' });
    const token = getValue('token');

    if (token) {
      const data = {
        title: values.blogTitle,
        img: values.blogImg,
        summary: values.blogSummary,
        content,
        slug: values.blogSlug,
        category: categoryConvertTurkishToEnglish(values.blogCategory),
        pollActive: poll.active,
        pollQuestion: poll.question,
        pollOptions: poll.options,
      };
      makeRequest('/posts/add-post', 'POST', JSON.stringify(data)).then(
        (res) => {
          if (res.errorCode === undefined) {
            setLoading({ loading: false, error: '' });
            router.push(`/post/${values.blogSlug}`);
          } else {
            setLoading({
              loading: false,
              error: t(`errorCodes.${res.errorCode}`),
            });
          }
        },
      );
    }
  };

  const handlePollQuestion = ({ target }) => {
    setPoll({ ...poll, question: target.value });
  };

  const addOption = () => {
    if (!option.length) return;
    setPoll({ ...poll, options: [...poll.options, option] });
    setOption('');
  };

  const deleteOption = (index) => {
    const options = poll.options;
    options.splice(index, 1);
    setPoll({ ...poll, options });
  };
  return (
    <div className="flex pt-7 flex-col md:w-8/12 w-full md:pt-7 p-2 h-full mx-auto">
      <p className="mb-5 text-base font-bold">{t('createPost.header')}</p>
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
        <div className="flex w-full my-5 items-center">
          <span className="text-sm mr-4">{t('createPost.poll')}</span>
          <input
            onChange={() => setPoll({ ...poll, active: !poll.active })}
            checked={poll.active}
            style={{ width: '20px', height: '16px' }}
            type="checkbox"
          />
        </div>
        {poll.active === true && (
          <div className="flex flex-col w-full border border-borderColor bg-white p-5">
            <label className="mb-5 text-xs font-medium" htmlFor="pollQuestion">
              {t('createPost.pollQuestion')}
            </label>
            <Input
              id="pollQuestion"
              name="pollQuestion"
              type="text"
              value={poll.question}
              onChange={handlePollQuestion}
              placeholder={t('createPost.pollQuestion')}
            />
            <div className="flex flex-col mt-5 justify-center">
              <span className="text-sm mb-2">{t('createPost.options')}</span>
              {poll.options.map((option, index) => {
                return (
                  <div key={index} className="flex mb-2 items-center">
                    <span className="text-sm mr-4">{option}</span>
                    <TrashIcon
                      onClick={() => deleteOption(index)}
                      className="cursor-pointer"
                    />
                  </div>
                );
              })}
              <div className="flex mt-5 items-center">
                <Input
                  type="text"
                  value={option}
                  className="mr-5"
                  onChange={(e) => setOption(e.target.value)}
                  placeholder={t('createPost.optionName')}
                />
                <Button
                  onClick={addOption}
                  size="small"
                  disabled={option.length < 1}
                >
                  {t('createPost.addOption')}
                </Button>
              </div>
            </div>
          </div>
        )}
        {loading.error.length > 0 && (
          <p className="my-2 text-xs font-bold text-red-500">{loading.error}</p>
        )}
        <Button
          onClick={handleSubmit}
          loading={loading.loading}
          extraClassName="mt-3 w-full"
        >
          {t('createPost.share')}
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
