import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Blog Post #{id}</h2>
      <p>This content is rendered dynamically using the route parameter.</p>
    </div>
  );
};

export default BlogPost;
