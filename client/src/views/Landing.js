import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  return (
    <div>
      <p>Landing page</p>
      <Link to="/login">
        <Button text="Log in" backgroundColor="#e642f5" color="#fff" />
      </Link>
      <Link to="/register">
        <Button text="Sign up" backgroundColor="#e642f5" color="#fff" />
      </Link>
    </div>
  );
};

export default Landing;
