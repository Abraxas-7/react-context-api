import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useGlobalContext } from "../context/GlobalContext";

function PostPage() {
  const { id } = useParams();
  const { posts, fetchPostById } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && !posts[id]) {
      setLoading(true);
      fetchPostById(id);
      setLoading(false);
    }
  }, [id, posts, fetchPostById]);

  const post = posts[id];

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  if (!post) {
    return <div>Post non trovato</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 text-center">
          <h1>{post.title}</h1>
          <img
            src={post.image || "https://picsum.photos/600/400"}
            alt={post.title}
            className="img-fluid my-3"
          />
          <p>{post.content}</p>
          <span className="badge bg-primary">{post.tags.join(", ")}</span>
        </div>
        <div className="col-12 text-center mt-4">
          <Link to="/posts" className="btn btn-secondary">
            Torna ai Post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
