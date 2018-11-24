const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

// post request for employee
router.post("/", (req, res) => {
  const { email, password } = req.body;
  pool.query(
    `SELECT
    first_name,
    last_name,
    email,
    password,
    name
    FROM EMPLOYEE
    INNER JOIN GARAGE ON GARAGE.EMPLOYEE_employee_id=EMPLOYEE_employee_id
    WHERE email = ?`,
    [email],
    (err, results) => {
      if (err) {
        res.send({
          code: 400,
          failed: "error ocurred: ",
          err
        });
      } else {
        if (results.length > 0) {
          if (results[0].password === password) {
            res.send({
              code: 200,
              success: true,
              message: "login successful",
              data: results[0]
            });
          } else {
            res.send({
              code: 204,
              sucess: "Email and password does not match"
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
