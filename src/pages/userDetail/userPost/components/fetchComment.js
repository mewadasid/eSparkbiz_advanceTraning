import { useState } from "react";

export default function Fetchcomment({ commentId }) {
  const [comment, setComment] = useState([]);
  const [commentvisible, setCommentVisible] = useState(false);
  const fetchcomment = async (commentId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${commentId}`
      );
      const data = await response.json();
      if (commentvisible) {
        setComment([]);
        setCommentVisible(false);
      } else {
        setCommentVisible(true);
        setComment(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="load_comment">
      <div className="btn_loadcomment">
        <button onClick={() => fetchcomment(commentId)}>
          <i className="fa-regular fa-comment"></i>Load Comments
        </button>
      </div>
      {comment.map((item) => {
        return (
          <>
            <div className="main_comment_card" key={item.id}>
              <div className="post_comment_content">
                <span className="head">{item.id}</span>
                <p className="head">{item.name}</p>
                <p className="postBody">{item.body}</p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
