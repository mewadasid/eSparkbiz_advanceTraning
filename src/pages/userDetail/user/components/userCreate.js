import { useRef, useState, useEffect } from "react";
import "../css/style.css";
import { useNavigate } from "react-router-dom";
export default function Usercreate() {
  const [elements, setElement] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    number: "",
    gender: "",
    dob: "",
    intrest: [],
    achievment: [],
  });

  const [errors, setError] = useState({});
  const navigate = useNavigate();

  const initialRender = useRef(true);
  //to stop initialRender we use useRef ,useRef preseve value on render it not at every re-render
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (
        Object.keys(errors).length === 0 &&
        Object.keys(elements).length !== 0
      ) {
        /* Redirect if no errors occur */
        console.log(elements);
        navigate("/post/createPost");
      }
    }
    //eslint-disable-next-line
  }, [errors]);

  /* calling at submit time and call validate  */
  function checkEmpty(e) {
    const temp = {};

    Object.keys(elements).forEach((item) => {
      let UserIntrest = [];
      if (item === "intrest") {
        for (let i = 0; i < e.target["intrest"].length; i++) {
          if (e.target["intrest"][i].checked) {
            UserIntrest.push(e.target["intrest"][i].value);
            temp["intrest"] = UserIntrest;
          } else {
            temp["intrest"] = UserIntrest; //store empty array bcz of  validation
          }
        }
      } else if (item === "achievment") {
        let achievmentArray = [];

        if (e.target["achievment"] !== undefined) {
          if (e.target["achievment"].length === undefined)
            if (
              e.target["achievment"].value !== "" &&
              e.target["achievment_date"].value !== ""
            ) {
              achievmentArray.push(
                e.target["achievment"].value +
                  "," +
                  e.target["achievment_date"].value
              );

              temp["achievment"] = achievmentArray;
            } else {
              temp["achievment"] = achievmentArray;
            }
          else {
            for (let i = 0; i < e.target["achievment"].length; i++) {
              if (
                e.target["achievment"][i].value !== "" &&
                e.target["achievment_date"][i].value !== ""
              ) {
                achievmentArray.push(
                  e.target["achievment"][i].value +
                    "," +
                    e.target["achievment_date"][i].value
                );

                temp["achievment"] = achievmentArray;
              } else {
                temp["achievment"] = achievmentArray;
              }
            }
          }
        }
      } else {
        temp[item] = e.target[item].value;
      }
    });

    setElement(temp); /* Set temp to elements varible */

    e.preventDefault();
    setError(validate(temp));
  }

  /* calling at submit time and call validate  */

  /* Function to get current date in yyyy-mm-dd format */
  function getCurrentDate() {
    let date = new Date();

    let dateString;
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : "" + month;
    dateString = date.getFullYear() + "-" + month + "-" + date.getDate();
    return dateString;
  }
  /* Function to get current date in yyyy-mm-dd format */

  /* Adding row on button click and removing row when remove button click */
  const [addingRow, setAddrow] = useState([]);
  function addRow(e) {
    let cloneTd = [...addingRow, []];

    setElement({ ...elements, achievment: [] });
    setAddrow(cloneTd);
  }

  function removeRow(index) {
    let rtd = [...addingRow];
    rtd.splice(index, 1);
    setAddrow(rtd);
  }
  /* Adding row on button click and removing row when remove button click */

  /* Form field validation */
  function validate(inputValue) {
    const error = {};
    if (inputValue.firstname === "") {
      error.firstname = "Please Fill Firstname";
    }
    if (inputValue.lastname === "") {
      error.lastname = "Please Fill Lastname";
    }
    if (inputValue.email === "") {
      error.email = "Please Fill Email";
    }
    if (inputValue.number === "") {
      error.number = "Please Fill Number";
    } else {
      let number_regex = /^[1-9]\d{9}/gm;
      if (!number_regex.test(inputValue.number)) {
        error.number = "Mobile number must be 10 digit only";
      }
    }
    if (inputValue.address === "") {
      error.address = "Please Fill Addrress";
    }
    if (inputValue.dob === "") {
      error.dob = "Please Select Date of Birth ";
    } else {
      let currDate = getCurrentDate();
      if (inputValue.dob.includes(currDate) || inputValue.dob > currDate) {
        error.dob = "Date cannot be greater than today or equal";
      } else {
        /* If user enter date less than current then we check year for validation like year cannot be current */
        let date = new Date();
        let year = date.getFullYear();
        year = year.toString();
        let inputYear = inputValue.dob.split("-")[0];
        if (inputYear === year || inputYear > year) {
          error.dob = "Year cannot be greater than currnet year or equal ";
        }
      }
    }
    if (inputValue.gender === "") {
      error.gender = "Please Select Gender";
    }
    if (inputValue.intrest.length === 0) {
      error.intrest = "Please select any one";
    }
    if (inputValue.achievment) {
      if (inputValue.achievment.length === 0)
        error.achievment = "Please select achievments";
    }
    return error;
  }

  /* Form field validation */

  /* Returing Form */
  return (
    <>
      <form method="post" className="userform" onSubmit={checkEmpty}>
        <table id="main_table">
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
                <label>Lastname : </label>
              </td>
              <td>
                <input
                  type="text"
                  name="lastname"
                  id="userLastname"
                  placeholder="Enter Lastname"
                />
                <span className="fieldError">{errors.lastname}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Email : </label>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder="Enter Email"
                />
                <span className="fieldError">{errors.email}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Number : </label>
              </td>
              <td>
                <input
                  type="text"
                  name="number"
                  id="userNumber"
                  placeholder="Enter Mobile Number"
                />
                <span className="fieldError">{errors.number}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Address : </label>
              </td>
              <td>
                <textarea
                  name="address"
                  id="userAddress"
                  rows="4"
                  maxLength="200"
                  placeholder="Enter Address"
                ></textarea>
                <span className="fieldError">{errors.address}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>DOB : </label>
              </td>
              <td>
                <input type="date" name="dob" id="userEmail" min="1980-12-31" />
                <span className="fieldError">{errors.dob}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Gender : </label>
              </td>
              <td>
                <input type="radio" name="gender" value="Male" /> Male
                <input type="radio" name="gender" value="Female" /> Female
                <input type="radio" name="gender" value="Other" /> Other
                <span className="fieldError">{errors.gender}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Intrest : </label>
              </td>
              <td>
                <input type="checkbox" name="intrest" value="sports" />
                Sports
                <input type="checkbox" name="intrest" value="music" />
                Music
                <input type="checkbox" name="intrest" value="writing" />
                Writing
                <input type="checkbox" name="intrest" value="travel" />
                Travel
                <span className="fieldError">{errors.intrest}</span>
              </td>
            </tr>
            <tr>
              <td id="achievment_row">
                <i className="fa-solid fa-circle-plus icon_ml" onClick={addRow}>
                  ADD
                </i>
              </td>
            </tr>
            {addingRow.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <label>Achievments:</label>
                  </td>
                  <td id="achievment_row">
                    <input type="text" name="achievment" id="achievmentTitle" />
                    <input
                      type="date"
                      name="achievment_date"
                      id="achievmentDate"
                    />
                    <i
                      className="fa-sharp fa-solid fa-xmark icon_ml"
                      onClick={() => removeRow(index)}
                    >
                      Remove
                    </i>
                    <span className="fieldError">{errors.achievment}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <input type="submit" value="Create User" />
      </form>
    </>
  );
  /* Returing Form */
}
