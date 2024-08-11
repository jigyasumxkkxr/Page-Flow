import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Landing } from "./pages/Landing"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { MyBlog } from "./pages/MyBlogs"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Landing />} />
          <Route path="/signup" element = {<Signup />} />
          <Route path="/signin" element = {<Signin />} />
          <Route path="/blog/:id" element = {<Blog />} />
          <Route path="/blogs" element = {<Blogs />} />
          <Route path="/create" element = {<Publish />} />
          <Route path="/myblogs" element = {<MyBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
