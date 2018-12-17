const pool = require("../model/connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// post request for employee
router.post("/login", (req, res) => {
  let { email, password } = req.body;

  console.log("email:", email);
  console.log("password:", password);

  email = email.trim();
  password = password.trim();
  pool.query(
    `SELECT
    employee_id,
    first_name,
    last_name,
    email,
    password,
    name,
    garage_id
    FROM EMPLOYEE
    INNER JOIN GARAGE
    ON EMPLOYEE.GARAGE_garage_id = GARAGE.garage_id
    WHERE role = 'manager'
    AND email = ?`,
    [email],
    (err, results) => {
      if (err) {
        res.send({
          code: 400,
          failed: "error ocurred: ",
          err
        });
      } else {
        let data = {
          garage_id: results[0].garage_id,
          garage_name: results[0].name,
          employee_id: results[0].employee_id,
          employee_name: results[0].first_name,
          employee_last_name: results[0].last_name
        };
        if (results.length > 0) {
          if (results[0].password === password) {
            jwt.sign(data, "secretkey", (err, token) => {
              res.json({
                token,
                code: 200,
                success: true,
                message: "login successful",
                results: {
                  garage_id: results[0].garage_id,
                  garage_name: results[0].name,
                  employee_id: results[0].employee_id,
                  employee_name: results[0].first_name,
                  employee_last_name: results[0].last_name
                }
              });
            });
          } else {
            res.send({
              code: 204,
              sucess: false,
              message: "Email and/or password do not match"
            });
          }
        } else {
          res.send({
            code: 204,
            sucess: "Email does not exists"
          });
        }
      }
    }
  );
});

module.exports = router;
