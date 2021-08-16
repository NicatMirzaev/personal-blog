import PropTypes from 'prop-types';
import { makeRequest } from '../../lib/helpers';
import PostDetails from '../../components/pages/PostDetails';

const Post = ({ data, otherPosts }) => (
  <PostDetails post={data} otherPosts={otherPosts} />
);

Post.propTypes = {
  data: {
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
};
export async function getServerSideProps({ query }) {
  const { slug } = query;
  const data = await makeRequest(`/posts/get-post-by-slug?slug=${slug}`, 'GET');
  const otherPosts = await makeRequest(
    `/posts/get-posts-by-category?category=${data.category}`,
    'GET',
  );
  return { props: { data, otherPosts } };
}

export default Post;
