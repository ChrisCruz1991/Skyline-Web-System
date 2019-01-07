import { NavItem } from "reactstrap";
import React from "react";

const CircleUser = ({ name, lastName }) => {
  return (
    <NavItem className=" mx-2 text-white">
      <span
        className="bg-danger"
        style={{
          margin: "0",
          padding: "12px",
          borderRadius: "50%"
        }}>
        {name[0]}
        {lastName[0]}{" "}
      </span>
    </NavItem>
  );
};

export default CircleUser;
