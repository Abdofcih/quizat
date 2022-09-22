import React, { useState } from "react";
import { FormRow } from "../../../components";
import { useAppcontext } from "../../../context/AppContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import "./Profile.css";
const Profile = () => {
  const { user, updateUser, doToast, isLoading, updateUser } = useAppcontext();
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = e => {
    e.preventDefault();
    //remove while testing
    /*  if (!name || !lastName || !email || !location) {
      return displayAlert({
        message: "please provide all values",
        alertType: "danger"
      });
    } */
    updateUser({ name, email, lastName, location });
  };

  return (
    <section className="updateProfile">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            inputId="name"
            lableText="name"
            type="text"
            name="name"
            value={name}
            handleChange={e => setName(e.target.value)}
          />
          <FormRow
            inputId="lastName"
            lableText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={e => setLastName(e.target.value)}
          />
          <FormRow
            inputId="email"
            lableText="email"
            type="email"
            name="email"
            value={email}
            handleChange={e => setEmail(e.target.value)}
          />
          <FormRow
            inputId="location"
            lableText="location"
            type="text"
            name="location"
            value={location}
            handleChange={e => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Saving ..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};
