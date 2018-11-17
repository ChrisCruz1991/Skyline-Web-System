const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/client", (req, res) => {
  pool.query(
    `SELECT
      client_id AS id,
      first_name AS Name,
      last_name AS Last_Name,
      phone AS Phone,
      email AS Email
      FROM CLIENT`,
    (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});

router.get("/client/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT
    first_name AS Name,
    last_name AS Last_Name,
    make AS Make,
    model AS Model,
    color AS Color,
    year AS Year
    FROM VEHICLE
    INNER JOIN CLIENT
    ON CLIENT.client_id=VEHICLE.CLIENT_client_id
    WHERE CLIENT.client_id=${id};
    `,
    (err, result) => {
      if (err) throw err;
      // Returns the list of vehicles of that
      // specific client by id
      const list_vehicles = result.map(result => {
        return {
          Make: result.Make,
          Model: result.Model,
          Color: result.Color,
          Year: result.Year
        };
      });
      return res.json({
        client: `${result[0].Name} ${result[0].Last_Name}`,
        vehicles: list_vehicles
      });
    }
  );
});

module.exports = router;
