import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Postcreate() {
  const [postdata, setPostData] = useState({
    firstname: "",
    post_title: "",
    post_description: "",
  });
  const [errors, setPostError] = useState({});
  const navigate = useNavigate();
  const initialRender = useRef(true);

  /* calling at submit time and call validate  */
  function postEmpty(e) {
    let temp = {};
    Object.keys(postdata).forEach((item) => {
      temp[item] = e.target[item].value;
    });
    setPostData(temp);
    setPostError(validate(temp));
    e.preventDefault();
  }

  /* calling at submit time and call validate  */

  /* Display object when no errors */
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (
        Object.keys(errors).length === 0 &&
        Object.keys(postdata).length !== 0
      ) {
        navigate("/user");
      }
    }
    //eslint-disable-next-line
  }, [errors]);

  /* Display object when no errors */

  /* validate post data */
  function validate(inputValue) {
    let error = {};
    if (inputValue.firstname === "") {
      error.firstname = "Firstname is required";
    }
    if (inputValue.post_title === "") {
      error.post_title = "Post title is necessary";
    }
    if (inputValue.post_description === "") {
      error.post_description = "Please give some description";
    }
    return error;
  }
  /* validate post data */

  return (
    <div>
      <form method="post" className="userform" onSubmit={postEmpty}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Firstname : </label>
              </td>
              <td>
                <input
                  type="text"
                  name="firstname"
                  id="userFirstname"
                  placeholder="Enter Firstname"
                />
                <span className="fieldError">{errors.firstname}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Post Title : </label>
              </td>
              <td>
                <input
                  type="text"
                  name="post_title"
                  id="postTitle"
                  placeholder="Enter Post Title"
                />
                <span className="fieldError">{errors.post_title}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Post Description : </label>
              </td>
              <td>
                <textarea
                  name="post_description"
                  id="postDescription"
                  rows="5"
                  maxLength="400"
                  placeholder="Enter Address"
                ></textarea>
                <span className="fieldError">{errors.post_description}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Create Post" />
      </form>
    </div>
  );
}
