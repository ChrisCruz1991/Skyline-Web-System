import React from "react";

const Vehicle = ({ make, model, year }) => (
  <ul>
    <li>{make}</li>
    <li>{model}</li>
    <li>{year}</li>
  </ul>
);

export default Vehicle;
