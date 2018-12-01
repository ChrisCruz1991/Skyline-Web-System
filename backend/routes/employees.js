const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/employee/table/:id", (req, res) => {
  const garage_id = req.params.id;
  pool.query(
    `SELECT
      employee_id AS id,
      first_name AS Name,
      last_name AS Last_Name,
      EMPLOYEE.phone AS Phone,
      email AS Email,
      EMPLOYEE.address AS Address,
      role AS Role
      FROM EMPLOYEE
      INNER JOIN GARAGE
      ON EMPLOYEE.GARAGE_garage_id=GARAGE.garage_id
      WHERE garage_id = ?`,
    garage_id,
    (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT employee_id, vehicle_id, first_name, last_name, address, phone, role, make, model, color, year
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
        id: result[0].employee_id,
        vehicle_id: result[0].vehicle_id,
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
