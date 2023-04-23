import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Fetchcomment from "./fetchComment";
import "../css/style.css";

function Post() {
  const [post, setPost] = useState([]);

  const [visible, setVisible] = useState(3);
  const userId = useLocation();
  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId.state}`
      );
      const data = await response.json();
      // console.log(data);
      if (data) {
        setPost(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
    //eslint-disable-next-line
  }, []);

  function loadPost() {
    setVisible((prevvisible) => {
      return (prevvisible += 3);
    });
  }

  return (
    <>
      <div className="container">
        <Link to={"/user"}>
          <button className="back_btn">
            <i class="fa-sharp fa-solid fa-arrow-left"></i>Back to User
          </button>
        </Link>

        {post.slice(0, visible).map((item) => (
          <div className="post_card" key={item.id}>
            <div className="post_content">
              <span className="head">{item.id}</span>
              <p className="head">{item.title}</p>
              <p className="postBody">{item.body}</p>
            </div>
            <Fetchcomment commentId={item.id} />
          </div>
        ))}
      </div>
      <div className="btn_loadmore">
        <button onClick={loadPost}>Load Posts</button>
      </div>
    </>
  );
}
export default Post;
