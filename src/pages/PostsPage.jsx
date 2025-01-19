import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "../components/Card";

const apiUrl = import.meta.env.VITE_API_URL;

function PostsPage() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    getData(search);
  }, [search]);

  function getData(search) {
    const options = search ? { params: { search } } : {};
    axios
      .get(apiUrl + "/posts", options)
      .then((res) => {
        const filtered = (res.data.data || [])
          .filter((post) => post.published)
          .filter(
            (post) =>
              post.title.toLowerCase().includes(search.toLowerCase()) ||
              post.content.toLowerCase().includes(search.toLowerCase())
          );

        setPosts(res.data.data);
        setFilteredPosts(filtered);
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dati:", error);
      });
  }

  function deleteItem(id) {
    axios
      .delete(apiUrl + "/posts/" + id)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
        setFilteredPosts(filteredPosts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione:", error);
      });
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <section className="container my-5">
      <h1>Posts</h1>
      <div className="row">
        <div className="col-12">
          <Link to="/posts/create" className="btn btn-success">
            Aggiungi un post
          </Link>
        </div>
        <div className="col-12 py-4">
          <label htmlFor="search" className="form-label">
            Cerca
          </label>
          <input
            type="search"
            name="search"
            id="search"
            value={search}
            className="form-control"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row gy-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div className="col-12 col-md-6 col-lg-4" key={post.id}>
              <Card
                image={post.image}
                title={post.title}
                description={post.content}
                badge={post.tags.join(", ")}
                id={post.id}
                onDelete={() => deleteItem(post.id)}
              />
            </div>
          ))
        ) : (
          <p>Non ci sono post disponibili</p>
        )}
      </div>
    </section>
  );
}

export default PostsPage;
