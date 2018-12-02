const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/vehicle/dashboard/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT
    vehicle_id AS id,
    make AS Make,
    model AS Model,
    color AS Color,
    year AS Year,
    status AS Status,
    first_name AS Name
    FROM VEHICLE
    INNER JOIN CLIENT ON CLIENT.client_id=VEHICLE.CLIENT_client_id
    WHERE VEHICLE.GARAGE_garage_id = ?`,
    id,
    (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});

router.get("/vehicle/:id", (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM VEHICLE WHERE vehicle_id=${id}`, (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
});

/*
  router.post to update the vehicle
  to assign an employee based on employee_id
*/

router.post("/vehicle/update", (req, res) => {
  const { employee_id, vehicle_id } = req.body;
  console.log("employee id ", employee_id);
  console.log("vehicle id: ", vehicle_id);

  const UPDATE_QUERY = `UPDATE VEHICLE SET EMPLOYEE_employee_id = ?, status = ?
                      WHERE vehicle_id = ?`;
  pool.query(UPDATE_QUERY, [employee_id, 1, vehicle_id], (err, result) => {
    if (err) {
      return res.send({
        success: false,
        message: "you fucked up the server: ",
        err
      });
    } else {
      return res.json({
        success: true,
        message: "Vehicle updated!"
      });
    }
  });
});

/*
  POST to INSERT a new vehicle
  (needs the id from the  last client added)
*/

router.post("/vehicle/new", (req, res) => {
  const { make, model, year, color, license_plate, garage_id } = req.body;

  // Get the id from the last client added
  pool.query("SELECT * FROM CLIENT", (err, result) => {
    if (err) {
      return res.send({
        success: false,
        code: 500,
        message: "ERROR! ",
        err
      });
    } else {
      // Get the id of the last client added
      const client_id = result[result.length - 1].client_id;

      //INSERT the vehicle with the correct data
      const INSERT_QUERY = `INSERT INTO VEHICLE
      (make, model, year, color, vehicle_in_garage, status, license_plate, CLIENT_client_id, GARAGE_garage_id)
      VALUES ?`;
      const VALUES = [
        [make, model, year, color, 1, 0, license_plate, client_id, garage_id]
      ];
      pool.query(INSERT_QUERY, [VALUES], (err, result) => {
        if (err) {
          return res.send({
            success: false,
            code: 500,
            message: "ERROR! ",
            err
          });
        } else {
          return res.send({
            success: true,
            code: 200,
            message: "Vehicle succesfully added"
          });
        }
      });
    }
  });
});

module.exports = router;
