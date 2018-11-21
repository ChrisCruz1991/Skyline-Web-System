const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/vehicle", (req, res) => {
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
    INNER JOIN CLIENT ON CLIENT.client_id=VEHICLE.CLIENT_client_id;`,
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

module.exports = router;
