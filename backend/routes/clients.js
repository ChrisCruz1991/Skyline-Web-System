const pool = require("../model/connection");
const express = require("express");
const router = express.Router();
const verifyToken = require("./token");
const jwt = require("jsonwebtoken");

router.get("/clients", verifyToken.verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      pool.query(
        `SELECT
        client_id AS id,
        first_name AS Name,
        last_name AS Last_Name,
        email AS Email,
        phone AS Phone
        FROM VEHICLE
        INNER JOIN CLIENT
        ON CLIENT.client_id = VEHICLE.CLIENT_client_id
        WHERE VEHICLE.GARAGE_garage_id = ?`,
        authData.garage_id,
        (err, result) => {
          if (err) throw err;
          return res.json(result);
        }
      );
    }
  });
});

router.get("/client/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT
    client_id,
    first_name AS Name,
    last_name AS Last_Name,
    CLIENT.email AS email,
    CLIENT.phone as phone,
    CLIENT.address AS address,
    make AS Make,
    model AS Model,
    color AS Color,
    year AS Year,
    vehicle_id AS id
    FROM VEHICLE
    INNER JOIN CLIENT
    ON CLIENT.client_id=VEHICLE.CLIENT_client_id
    WHERE CLIENT.client_id=${id};
    `,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error in client with id: " + err
        });
      }

      // Returns the list of vehicles of that
      // specific client by id

      // si alguien mira esto porfavor es solo para salir de la clase
      // se que no hace sentido y esta super mal lo reconozco.
      const list_vehicles = result.map(result => {
        return {
          id: result.id,
          Make: result.Make,
          Email: result.email,
          Phone: result.phone,
          address: result.address,
          Model: result.Model,
          Color: result.Color,
          Year: result.Year,
          client_id: result.client_id
        };
      });
      return res.json({
        name: `${result[0].Name} ${result[0].Last_Name}`,
        vehicles: list_vehicles
      });
    }
  );
});

/*
  POST data for new client
*/

// Falta Añadirle la verificacion de token.
router.post("/client/new", (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;

  pool.query("SELECT * FROM CLIENT WHERE email = ?", email, (err, result) => {
    if (err) {
      return res.send({
        success: false,
        code: 500,
        message: "ERROR! ",
        err
      });
    } else {
      if (result.length > 0) {
        return res.send({
          success: false,
          code: 204,
          message: "Error: client already exists"
        });
      } else {
        // insert new client
        const INSERT_QUERY = `INSERT INTO CLIENT
        (first_name, last_name, phone, email, address)
        VALUES ?`;
        const VALUES = [[first_name, last_name, phone, email, address]];

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
              message: "Client added!"
            });
          }
        });
      }
    }
  });
});

/*
  POST REQUEST for adding new vehicle
  to a specific client
*/
router.post("/client/new_vehicle", (req, res) => {
  console.log("adding new vehicle");
  const {
    make,
    model,
    year,
    color,
    license_plate,
    garage_id,
    client_id
  } = req.body;
  const INSERT_VEHICLE_QUERY = `INSERT INTO VEHICLE
      (make, model, year, color, vehicle_in_garage, status, license_plate, CLIENT_client_id, GARAGE_garage_id)
      VALUES ?`;

  const INSERT_VEHICLE_VALUES = [
    [make, model, year, color, 1, 0, license_plate, client_id, garage_id]
  ];

  pool.query(INSERT_VEHICLE_QUERY, [INSERT_VEHICLE_VALUES], (err, result) => {
    if (err) {
      console.log("error");
      res.send({
        code: 500,
        success: false,
        message: "ERROR: ",
        err,
        error: "error"
      });
      console.log("error");
    } else {
      return res.send({
        code: 500,
        success: true,
        message: "Successfully added a vehicle"
      });
    }
  });
});

module.exports = router;
