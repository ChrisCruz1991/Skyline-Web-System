const express = require("express");
const pool = require("../model/connection");
const router = express.Router();

router.post("/signup", (req, res) => {
  const {
    garage_name,
    garage_address,
    garage_phone,
    first_name,
    last_name,
    password,
    phone,
    address
  } = req.body;

  let { email } = req.body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank"
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannto be blank"
    });
  }

  email = email.toLowerCase().trim();

  pool.query("SELECT * FROM EMPLOYEE WHERE email = ?", email, (err, result) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error. Server Error"
      });
    } else {
      if (result.length > 0) {
        return res.send({
          success: false,
          message: "Error: Client already registered"
        });
      } else {
        // CREATE GARAGE FIRST
        const GARAGE_QUERY =
          "INSERT INTO GARAGE (name, address, phone) VALUES ?";
        const GARAGE_VALUES = [[garage_name, garage_address, garage_phone]];

        pool.query(GARAGE_QUERY, [GARAGE_VALUES], (err, result) => {
          if (err) {
            return res.send({
              success: false,
              message: err
            });
          } else {
            // Make query to search for the last created garage
            pool.query("SELECT garage_id from GARAGE", (err, result) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Error in server: " + err
                });
              } else {
                let garage_id = result[result.length - 1].garage_id;

                console.log(garage_id);

                const EMP_QUERY =
                  "INSERT INTO EMPLOYEE (first_name, last_name, email, password, phone, address, role, GARAGE_garage_id) VALUES ?";
                const EMP_VALUES = [
                  [
                    first_name,
                    last_name,
                    email,
                    password,
                    phone,
                    address,
                    "manager",
                    garage_id
                  ]
                ];

                pool.query(EMP_QUERY, [EMP_VALUES], (err, result) => {
                  if (err) {
                    return res.send({
                      success: false,
                      message: "Error inserting employee: " + err
                    });
                  } else {
                    // Update the garage created to insert the new client id
                    pool.query(
                      "SELECT employee_id FROM EMPLOYEE",
                      (err, result) => {
                        if (err) return err;
                        const employee_id =
                          result[result.length - 1].employee_id;

                        const UPDATE_GARAGE_TABLE =
                          "UPDATE GARAGE SET EMPLOYEE_employee_id = ? WHERE garage_id = ?";
                        const UPDATE_GARAGE_VALUES = [employee_id, garage_id];

                        pool.query(
                          UPDATE_GARAGE_TABLE,
                          UPDATE_GARAGE_VALUES,
                          (err, result) => {
                            if (err) {
                              return res.send({
                                success: false,
                                message: "Error updating garage table: ",
                                err
                              });
                            } else {
                              return res.send({
                                success: true,
                                message: "Finally finished"
                              });
                            }
                          }
                        );
                      }
                    );
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});

module.exports = router;
