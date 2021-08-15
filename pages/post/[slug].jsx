import PropTypes from 'prop-types';
import { makeRequest } from '../../lib/helpers';
import PostDetails from '../../components/pages/PostDetails';

const Post = ({ data }) => <PostDetails post={data} />;

Post.propTypes = {
  data: {
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
  }.isRequired,
};
export async function getServerSideProps({ query }) {
  const { slug } = query;
  const data = await makeRequest(
    '/posts/get-post-by-slug',
    'POST',
    JSON.stringify({ slug }),
  );
  return { props: { data } };
}

export default Post;
