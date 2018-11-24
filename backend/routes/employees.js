const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT first_name, last_name, address, phone, role, make, model, color, year
    FROM VEHICLE
    INNER JOIN EMPLOYEE ON EMPLOYEE.employee_id=VEHICLE.EMPLOYEE_employee_id
    WHERE employee_id=${id};`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          message: "Dervin fucked up: " + err
        });
      }
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
        phone: result[0].phone,
        address: result[0].address,
        role: result[0].role,
        vehicles: list_vehicles
      });
    }
  );
});

module.exports = router;
