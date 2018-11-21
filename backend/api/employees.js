const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/employee", (req, res) => {
  pool.query(
    `SELECT
      employee_id AS id,
      first_name AS Name,
      last_name AS Last_Name,
      phone AS Phone,
      email AS Email,
      address AS Address,
      role AS Role
      FROM EMPLOYEE`,
    (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT first_name, last_name, role, make, model, color, year
    FROM VEHICLE
    INNER JOIN EMPLOYEE ON EMPLOYEE.employee_id=VEHICLE.EMPLOYEE_employee_id
    WHERE employee_id=${id};`,
    (err, result) => {
      if (err) throw err;
      const list_vehicles = result.map(item => {
        return {
          Make: item.make,
          Model: item.model,
          Color: item.color,
          Year: item.year
        };
      });
      res.json({
        name: `${result[0].first_name} ${result[0].last_name}`,
        role: result[0].role,
        vehicles: list_vehicles
      });
    }
  );
});

module.exports = router;
