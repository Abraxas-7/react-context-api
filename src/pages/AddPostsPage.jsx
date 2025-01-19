import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function AddPostPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recupera i tag dal backend
  useEffect(() => {
    axios
      .get(`${apiUrl}/tags`)
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setAllTags(res.data.data);
        } else {
          console.error("Errore: i tag non sono un array.", res.data);
        }
      })
      .catch((err) => {
        console.error("Errore durante il recupero dei tag:", err);
      });
  }, []);

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    if (e.target.checked) {
      setTags([...tags, selectedTag]);
    } else {
      setTags(tags.filter((tag) => tag !== selectedTag));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      title,
      content,
      tags,
      image,
      published: true,
    };
    axios
      .post(`${apiUrl}/posts`, postData)
      .then((res) => {
        console.log(res);
        const newPostId = res.data.id;
        navigate(`/posts/${newPostId}`);
      })
      .catch((err) => {
        console.error("Errore durante l'invio del post:", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container my-5">
      <h1>Aggiungi un nuovo post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titolo
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Contenuto
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <div className="row">
            {Array.isArray(allTags) && allTags.length > 0 ? (
              allTags.map((tag) => (
                <div key={tag} className="col-md-3 mb-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={tag}
                      value={tag}
                      onChange={handleTagChange}
                    />
                    <label className="form-check-label" htmlFor={tag}>
                      {tag}
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <p>No tags available</p>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            URL immagine
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Aggiungendo..." : "Aggiungi Post"}
        </button>
      </form>
    </div>
  );
}

export default AddPostPage;
