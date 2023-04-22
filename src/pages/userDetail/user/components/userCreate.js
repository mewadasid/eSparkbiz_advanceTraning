import { useEffect, useState } from "react";
import "../css/style.css";
export default function Usercreate() {
  const [elements, setElement] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    number: "",
    gender: "",
    dob: "",
    intrest: "",
  });
  const [errors, setError] = useState({});

  /* calling at submit time and call validate  */
  function checkEmpty(e) {
    const temp = {};

    Object.keys(elements).forEach((item) => {
      if (item === "intrest") {
        for (let i = 0; i < e.target["intrest"].length; i++) {
          if (e.target["intrest"][i].checked) {
            temp["intrest"] += e.target["intrest"][i].checked;
          }
        }
      }

      temp[item] = e.target[item].value;
    });
    setElement(temp);
    console.log(elements);

    e.preventDefault();
    setError(validate(temp));
  }

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      Object.keys(elements).length !== 0
    ) {
      console.log(elements);
    }
    //eslint-disable-next-line
  }, [errors]);
  /* calling at submit time and call validate  */

  function getCurrentDate() {
    let date = new Date();
    let dateString;
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" : "" + date.getMonth() + 1;
    console.log(month, ">>>>>");
    dateString = date.getFullYear() + "-" + month + "-" + date.getDate();
    return dateString;
  }

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
    }
    if (inputValue.address === "") {
      error.address = "Please Fill Addrress";
    }
    if (inputValue.dob === "") {
      error.dob = "Please Select Date of Binirth";
    } else {
      console.log(inputValue.dob);
      let currDate = getCurrentDate();
      console.log(currDate);
      if (inputValue.dob.includes(currDate)) {
        error.currdate = "Selected Date is current date, Select Diffrent";
      }
    }
    if (inputValue.gender === "") {
      error.gender = "Please Select Gender";
    }
    return error;
  }

  /* Form field validation */

  /* Returing Form */
  return (
    <>
      <form method="post" className="userform" onSubmit={checkEmpty}>
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
                <input type="date" name="dob" id="userEmail" />
                <span className="fieldError">{errors.dob}</span>
                <span className="fieldError">{errors.currdate}</span>
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
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Create User" />
      </form>
    </>
  );
  /* Returing Form */
}
