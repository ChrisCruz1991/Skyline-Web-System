const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/employee", (req, res) => {
  pool.query("SELECT * FROM EMPLOYEE", (err, result) => {
    if (err) throw err;
    return res.send({ data: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * FROM EMPLOYEE WHERE employee_id=${id}`,
    (err, result) => {
      if (err) throw err;
      res.send({ data: result });
    }
  );
});

router.get("/employee/list_cars/", (req, res) => {
  pool.query(
    `SELECT first_name AS Name, last_name, role, make, model, color, year
          FROM VEHICLE
          INNER JOIN EMPLOYEE ON employee_id=VEHICLE.EMPLOYEE_employee_id`,
    (err, result) => {
      if (err) throw err;
      return res.send({ error: false, data: result });
    }
  );
});

module.exports = router;
