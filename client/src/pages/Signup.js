import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { HeartSwitch } from '@anatoliygatt/heart-switch';

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    mother: false
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // For Heart Slider
  const [checked, setChecked] = useState(false);

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <div>
                <h2>Are you a Mother?</h2>
                <HeartSwitch
                  size="lg"
                  inactiveTrackFillColor="#cffafe"
                  inactiveTrackStrokeColor="#22d3ee"
                  activeTrackFillColor="#06b6d4"
                  activeTrackStrokeColor="#0891b2"
                  inactiveThumbColor="#ecfeff"
                  activeThumbColor="#ecfeff"
                  checked={checked}
                  onChange={(event) => {
                    setChecked(event.target.checked);
                    formState.mother = !checked;
                  }}
                />
                {/* NEED MESSAGE - lets them know right is mother */}


              </div>


              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
