import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
const initialValues = {
  email: "",
  password: "",
  "confirm-password": "",
};

export default function Register() {
  const [error, setError] = useState("");
  const register = useRegister();
  const navigate = useNavigate();
  const registerHandler = async (values) => {
    if (values.password !== values["confirm-password"]) {
      setError("Passwords mismatch");
      return;
    }
    try {
      await register(values.email, values.password);

      navigate("/");
    } catch (err) {
        setError(err.message)      
      console.log(err.message);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    registerHandler
  );

  return (
    <section id="register-page" className="content auth">
      <form id="register" onSubmit={submitHandler}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Register</h1>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={changeHandler}
            placeholder="maria@email.com"
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="password"
            id="register-password"
            value={values.password}
            onChange={changeHandler}
          />

          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={values["confirm-password"]}
            onChange={changeHandler}
          />
          
          {error && (
            <p>
              <span style={{fontsize: '24px', color : 'red', textAlign : 'center'} }>{error}</span>
            </p>
          )}

          <input className="btn submit" type="submit" value="Register" />

          <p className="field">
            <span>
              If you already have profile click <Link to={`/login`}>
								here
							</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
