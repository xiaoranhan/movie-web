import React, { Component } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    // prevent reloading the page after pressing the button
    event.preventDefault();

    var userData = new URLSearchParams();
    userData.append("email", this.state.email);
    userData.append("password", this.state.password);

    axios
      .post("/users/login", userData)
      .then(res => {
        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        console.log(decoded);
        // Redirect to landing page
        this.props.history.push("/");
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <div style={container}>
        <div style={boxContainer}>
          <form onSubmit={this.handleSubmit} style={formContainer}>
            <p style={header}>Log in</p>
            <div style={inputContainer}>
              <label style={label}>Email</label>
              <input
                style={input}
                type="text"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                error={errors.email}
              />
              {errors.email ? <p style={errorMessage}>{errors.email}</p> : null}
            </div>
            <div style={inputContainer}>
              <label style={label}>Password</label>
              <input
                style={input}
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                error={errors.password}
              />
              {errors.password ? (
                <p style={errorMessage}>{errors.password}</p>
              ) : null}
            </div>
            <div style={buttonContainer}>
              <Button
                type="submit"
                value="Submit"
                text="Log in"
                backgroundColor="#e642f5"
                color="#fff"
              />
            </div>
          </form>
        </div>
        <div style={textContainer}>
          <p style={{ color: "#fff", fontFamily: "sans-serif", fontSize: 14 }}>
            Don't have account?
          </p>
          <div style={{ marginLeft: 20, height: 40 }}>
            <Link to="/register">
              <Button
                text="Sign up"
                backgroundColor="transparent"
                color="#fff"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const container = {
  height: "100vh",
  backgroundImage: "linear-gradient(#e642f5, #f58f14)",
  margin: 0,
  paddingTop: 100
};

const boxContainer = {
  backgroundColor: "#fff",
  width: 550,
  height: 380,
  marginRight: "auto",
  marginLeft: "auto"
};

const formContainer = {
  width: 350,
  margin: "auto",
  paddingTop: 40
};

const header = {
  color: "#131414",
  fontFamily: "sans-serif",
  fontSize: 22,
  fontWeight: 500,
  textAlign: "center"
};

const inputContainer = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  height: 90
};

const label = {
  color: "#838787",
  fontFamily: "sans-serif",
  fontSize: 12,
  marginBottom: 5
};

const input = {
  height: 34,
  fontSize: 14,
  color: "#535557",
  fontFamily: "inherit",
  border: "1px solid #c2cccc",
  borderRadius: 5
};

const buttonContainer = {
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end"
};

const textContainer = {
  marginTop: 20,
  marginLeft: "auto",
  marginRight: "auto",
  width: 250,
  display: "flex",
  flex: 1,
  flexDirection: "row",
  alignItems: "center"
};

const errorMessage = {
  color: "#f54260",
  fontFamily: "sans-serif",
  fontSize: 10
};
