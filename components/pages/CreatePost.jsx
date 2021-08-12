import React from 'react';
import Dropdown from 'react-dropdown';
import slugify from 'react-slugify';
import Input from '../ui/Input';
import Button from '../ui/Button';
import MarkdownEditor from '../ui/MarkdownEditor';

const categories = ['Science', 'Game', 'Technologie', 'Mobile', 'Software'];

const CreatePostPage = () => {
  const [content, setContent] = React.useState('');
  const [values, setValues] = React.useState({
    blogTitle: '',
    blogSlug: '',
    blogImg: '',
    blogCategory: categories[0],
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

  return (
    <div className="flex pt-7 flex-col md:w-8/12 w-full md:p-0 p-2 h-full mx-auto">
      <p className="mb-5 text-base font-bold">Create new post</p>
      <form>
        <label className="mb-5 text-xs font-medium" htmlFor="blogTitle">
          Title
        </label>
        <Input
          id="blogTitle"
          name="blogTitle"
          type="text"
          className="my-2"
          maxLength="100"
          value={values.blogTitle}
          onChange={handleChange}
          placeholder="Blog Title"
        />
        <label className="mb-5 text-xs font-medium" htmlFor="blogSlug">
          Slug
        </label>
        <Input
          id="blogSlug"
          name="blogSlug"
          type="text"
          className="my-2"
          maxLength="40"
          value={values.blogSlug}
          onChange={handleChange}
          placeholder="Blog Slug"
        />
        <label className="mb-5 text-xs font-medium" htmlFor="blogImg">
          Image
        </label>
        <Input
          id="blogImg"
          name="blogImg"
          type="text"
          className="my-2"
          value={values.blogImg}
          onChange={handleChange}
          placeholder="Blog Image URL"
        />
        <p className="mb-5 mt-2 text-xs font-medium">Category</p>
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
          Summary
        </label>
        <Input
          id="blogSummary"
          name="blogSummary"
          type="text"
          textarea
          onChange={handleChange}
          className="my-2"
          placeholder="Blog Summary"
        />
        <MarkdownEditor value={content} setValue={setContent} />
        <Button extraClassName="mt-3 w-full">Share</Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
