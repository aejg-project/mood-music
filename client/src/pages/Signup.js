import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        firstName: formState.firstName, lastName: formState.lastName
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">
        ← Go to Login
      </Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="astrologicalSign">Astrological Sign:</label>
          <select 
            // value = { this.state.value }
            placeholder="Sign"
            name="astrologicalSign"
            type="astrologicalSign"
            id="astrologicalSign"
            onChange={handleChange}>
              <option value = "Aquarius">Aquarius (Jan. 20 - Febr. 18)</option>
              <option value = "Pisces">Pisces (Feb. 19-Mar. 20)</option>
              <option value = "Aries">Aries (Mar. 21 - Apr. 19)</option>
              <option value = "Taurus">Taurus (Apr. 20 - May 20)</option>
              <option value = "Gemini">Gemini (May 21 - Jun. 20)</option>
              <option value = "Cancer">Cancer (Jun. 21 - Jul. 22)</option>
              <option value = "Leo">Leo (Jul. 23 - Aug. 22)</option>
              <option value = "Virgo">Virgo (Aug. 23 - Sep. 22)</option>
              <option value = "Libra">Libra (Sep. 23 - Oct. 22)</option>
              <option value = "Sorpio">Sorpio (Oct. 23 - Nov. 21)</option>
              <option value = "Sagittarius">Sagittarius (Nov. 22 - Dec. 21)</option>
              <option value = "Capricorn">Capricorn (Dec. 22 - Jan. 19)</option>


            </select>
        </div>
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

}

export default Signup;
