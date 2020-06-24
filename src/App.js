import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import { SignUpForm } from "./components/Signup";
import * as Yup from "yup";
import formSchema from "./components/formSchema";
import TaskForm from "./components/TaskForm";

import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/Dashboard";
import axiosWithAuth from "./utils/axiosWithAuth";

const initialFormValues = {
  username: "",
  password: "",
};

const initalFormErrors = {
  username: "",
  password: "",
};

export default function App() {
  const { push } = useHistory();

  // const [loginInfo, setLoginInfo] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initalFormErrors);
  const [disabled, setDisabled] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newLogin = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };

    axiosWithAuth()
      .post("/api/auth/login", newLogin)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />

        <Route path="/login">
          <Login
            values={formValues}
            onSubmit={onSubmit}
            onInputChange={onInputChange}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
        {/* add register */}
      </Switch>
    </div>
  );
}
