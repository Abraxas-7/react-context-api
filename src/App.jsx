import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import DefaultLayout from "./pages/DefaultLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PostsPage from "./pages/PostsPage";
import AddPostsPage from "./pages/AddPostsPage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path="/" Component={HomePage} />
          <Route path="/contact" Component={ContactPage} />
          <Route path="/about" Component={AboutPage} />
          <Route path="/posts">
            <Route index Component={PostsPage} />
            <Route path="create" Component={AddPostsPage} />
            <Route path=":id" Component={PostPage} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
