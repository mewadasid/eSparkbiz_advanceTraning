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
    achievment: "",
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
      const UserIntrest = [];

      switch (item) {
        case "intrest":
          const arrIntrest = e.target["intrest"];
          console.log(Object.values(arrIntrest), ";;;;;")


          const items = Object.values(arrIntrest).filter((item) => {
            return item.checked;
          }).map((item) => {
            UserIntrest.push(item.value);

            if (UserIntrest) {
              temp["intrest"] = UserIntrest;
            }
            return true;
          });
          if (items) {
            temp["intrest"] = UserIntrest
          }
          break;

        case "achievment":
          if (e.target["achievment"] !== undefined) {
            if (e.target["achievment"].length === undefined) {
              if (
                e.target["achievment"].value !== "" &&
                e.target["achievment_date"].value !== ""
              ) {
                temp["achievment"] = [{ title: e.target["achievment"].value, date: e.target["achievment_date"].value }];
              } else {
                temp["achievment"] = [{ title: "", date: "" }];
              }
            } else {

              const achievmentArray = e.target["achievment"];

              let achievment = [];

              Object.values(achievmentArray).forEach((item, index) => {
                debugger;
                console.log(index);
                if (
                  item.value !== "" &&
                  e.target["achievment_date"][index].value !== ""
                ) {
                  achievment.push([
                    {
                      title: item.value,
                      date: e.target["achievment_date"][index].value,
                    },
                  ]);
                  temp["achievment"] = achievment;
                } else {
                  temp["achievment"] = [{ title: "", date: "" }];
                }
                return true;
              });
            }
          }
          break;
        default: temp[item] = e.target[item].value;
          break;

      }
      // if (item === "intrest") {
      //   debugger

      // } else if (item === "achievment") {


      // } else {

      // }
    });

    setElement(temp); /* Set temp to elements varible */

    e.preventDefault();
    setError(validate(temp));
    console.log(temp);
  }
  /* calling at submit time and call validate  */

  /* Function to get current date in yyyy-mm-dd format */
  function getCurrentDate() {
    const date = new Date();

    let dateString = "";
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : "" + month;
    dateString = date.getFullYear() + "-" + month + "-" + date.getDate();
    return dateString;
  }
  /* Function to get current date in yyyy-mm-dd format */

  /* Adding row on button click and removing row when remove button click */
  const [addingRow, setAddrow] = useState([{ title: "", date: "" }]);
  function addRow(e) {
    const cloneTd = [...addingRow, { title: "", date: "" }];

    // setElement({ ...elements, achievment: { title: "", date: "" } }); //Adding a key with empty array when addrow click(because if user click direct submit then INTIAL Achievment key remove bcz of it not get into elseif condition write on above)
    setAddrow(cloneTd);
  }

  function removeRow(index) {
    const rtd = [...addingRow];
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
      const number_regex = /^[1-9]\d{9}/gm;
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
      const currDate = getCurrentDate();
      if (inputValue.dob.includes(currDate) || inputValue.dob > currDate) {
        error.dob = "Date cannot be greater than today or equal";
      } else {
        /* If user enter date less than current then we check year for validation like year cannot be current */
        const date = new Date();
        let year = date.getFullYear();
        year = year.toString();
        const inputYear = inputValue.dob.split("-")[0];
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

    inputValue.achievment.forEach((item) => {
      console.log(item.title);
      if (item.title === "") {
        error.achievment = "Please select achievments";
      }
    });

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

                    {index >= 1 ? (
                      <i
                        className="fa-sharp fa-solid fa-xmark icon_ml"
                        onClick={() => removeRow(index)}
                      >
                        Remove
                      </i>
                    ) : null}
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
  /* Returning Form */
}
