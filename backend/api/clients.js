const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/client", (req, res) => {
  pool.query("SELECT * FROM CLIENT", (err, result) => {
    if (err) throw err;
    return res.send({ data: result, message: "All clients" });
  });
});

router.get("/client/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool.query(`SELECT * FROM CLIENT WHERE client_id=${id}`, (err, result) => {
    if (err) throw err;
    return res.send({ data: result });
  });
});

router.get("/client/list_cars", (req, res) => {
  pool.query(
    `SELECT first_name AS Name, last_name AS Last_Name, make AS Make, model AS Model, color AS Color, year AS Year
    FROM VEHICLE
    INNER JOIN CLIENT
    ON CLIENT.client_id=VEHICLE.CLIENT_client_id
    WHERE CLIENT.client_id=1;`,
    (err, result) => {
      if (err) throw err;
      res.send({ error: false, data: result });
    }
  );
});

module.exports = router;
