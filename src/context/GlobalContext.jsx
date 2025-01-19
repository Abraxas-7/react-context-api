import { createContext, useContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState({});

  const fetchPostById = (id) => {
    if (!id) return;
    axios
      .get(`${apiUrl}/posts/${id}`)
      .then((response) => {
        const fetchedPost = response.data.item;
        setPosts((prevPosts) => ({
          ...prevPosts,
          [id]: fetchedPost,
        }));
      })
      .catch((error) => {
        console.error("Errore nel recupero del post:", error);
      });
  };

  return (
    <GlobalContext.Provider value={{ posts, fetchPostById }}>
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext deve essere usato all'interno di un GlobalProvider"
    );
  }
  return context;
}

export { GlobalProvider, useGlobalContext };
