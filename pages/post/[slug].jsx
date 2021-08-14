import { makeRequest } from '../../lib/helpers';
import PostDetails from '../../components/pages/PostDetails';

const Post = ({ data }) => {
  return <PostDetails post={data} />;
};

Post.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const data = await makeRequest(
    '/posts/get-post-by-slug',
    'POST',
    JSON.stringify({ slug }),
  );
  return { data: data[0] };
};

export default Post;
