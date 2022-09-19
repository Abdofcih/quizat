import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Logo, FormRow } from "../../components";
import "./Register.css";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true //Login or register
};
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const isLoading = false;

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const notify = () => toast("Wow so easy !");
  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      //toast alert
      toast("You must provide all values", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });

    console.log("dd", values);
  };
  return (
    <form className="form registerForm" onSubmit={onSubmit}>
      <Logo />
      <h3>{values.isMember ? "Login" : "Register"}</h3>
      {/*===> showAlert && <Alert />*/}
      {/* name input */}
      {!values.isMember && (
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
      )}

      {/* email input */}
      <FormRow
        type="email"
        name="email"
        value={values.email}
        handleChange={handleChange}
      />
      {/* password input */}
      <FormRow
        type="password"
        name="password"
        value={values.password}
        handleChange={handleChange}
      />
      <button type="submit" className="btn btn-block" disabled={isLoading}>
        submit
      </button>
      <p>
        {values.isMember ? "Not a member yet?" : "Already a member?"}
        <button type="button" onClick={toggleMember} className="member-btn">
          {values.isMember ? "Register" : "Login"}
        </button>
      </p>
    </form>
  );
};

export default Register;
