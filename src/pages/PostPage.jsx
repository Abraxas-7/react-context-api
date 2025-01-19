import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiUrl}/posts/${id}`)
        .then((res) => {
          setPost(res.data.item);
        })
        .catch((error) => {
          console.error("Errore nel recupero del post:", error);
        })
        .finally(() => {
          console.log("Caricamento completato");
        });
    }
  }, [id]);

  if (!post) {
    return <div>Caricamento in corso...</div>;
  }

  if (!post.published) {
    return <div>Post non pubblicato</div>;
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
