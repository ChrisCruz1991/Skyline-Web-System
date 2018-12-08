const pool = require("../model/connection");
const express = require("express");
const router = express.Router();
const verifyToken = require("./token");
const jwt = require("jsonwebtoken");

router.get("/employee/table", verifyToken.verifyToken, (req, res) => {
  console.log(req.token);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    console.log("AuthData", authData);
    if (err) {
      res.sendStatus(403);
    } else {
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
        authData.garage_id,
        (err, result) => {
          if (err) throw err;
          return res.json(result);
        }
      );
    }
  });
});

// Arreglar los codigos de token
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
          id: item.vehicle_id,
          Make: item.make,
          Model: item.model,
          Color: item.color,
          Year: item.year
        };
      });
      res.json({
        id: result[0].employee_id,
        name: `${result[0].first_name} ${result[0].last_name}`,
        phone: result[0].phone,
        address: result[0].address,
        role: result[0].role,
        vehicle_list: list_vehicles
      });
    }
  );
});

/*
    router post to insert new employee
    for your specific garage
  */

router.post("/employee/new", (req, res) => {
  const { first_name, last_name, phone, address, garage_id } = req.body;

  // Make sure employee doesn't exists first
  pool.query(
    "SELECT * FROM EMPLOYEE WHERE first_name = ?",
    first_name,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          message: "error in server",
          err
        });
      } else {
        if (result.length > 0) {
          return res.send({
            success: false,
            message: "Employee already exist"
          });
        } else {
          const INSERT_QUERY = `INSERT INTO EMPLOYEE
            (first_name, last_name, phone, address, role, GARAGE_garage_id)
            VALUES ?`;
          const VALUES = [
            [first_name, last_name, phone, address, "mechanic", garage_id]
          ];

          pool.query(INSERT_QUERY, [VALUES], (err, result) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error in server",
                err
              });
            } else {
              return res.send({
                success: true,
                message: "Created new employee!"
              });
            }
          });
        }
      }
    }
  );
});

module.exports = router;
