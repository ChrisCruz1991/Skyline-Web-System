const pool = require("../model/connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("./token");
const axios = require("axios");
const pdf = require("./generatePDF");

router.get("/services/table", verifyToken.verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      pool.query(
        `SELECT
        service_ticket_id AS service_id,
        service_string AS services,
        price_string AS prices,
        total as total,
        CLIENT.client_id AS client_id,
        CLIENT.first_name AS firstName,
        CLIENT.last_name AS lastName,
        VEHICLE_vehicle_id AS vehicle_id,
        VEHICLE.make AS make,
        VEHICLE.model AS model,
        VEHICLE.year AS year,
        VEHICLE.status AS status
        FROM SERVICE_TICKET 
        INNER JOIN VEHICLE 
        ON 
        VEHICLE.vehicle_id = SERVICE_TICKET.VEHICLE_vehicle_id 
        INNER JOIN CLIENT 
        ON
        VEHICLE.CLIENT_client_id = CLIENT.client_id
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

router.get("/services/:id", verifyToken.verifyToken, (req, res) => {
  const service_id = req.params.id;
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      pool.query(
        `SELECT
        service_ticket_id AS service_id,
        service_string AS services,
        price_string AS prices,
        total as total,
        CLIENT.client_id AS client_id,
        CLIENT.first_name AS firstName,
        CLIENT.last_name AS lastName,
        CLIENT.address AS address,
        CLIENT.phone AS phone,
        VEHICLE_vehicle_id AS vehicle,
        VEHICLE.make AS make,
        VEHICLE.model AS model,
        VEHICLE.year AS year,
        VEHICLE.status AS status
        FROM SERVICE_TICKET 
        INNER JOIN VEHICLE 
        ON 
        VEHICLE.vehicle_id = SERVICE_TICKET.VEHICLE_vehicle_id 
        INNER JOIN CLIENT 
        ON
        VEHICLE.CLIENT_client_id = CLIENT.client_id
        WHERE service_ticket_id = ?
        `,
        service_id,
        (err, result) => {
          if (err) throw err;
          else res.json(result);
        }
      );
    }
  });
});

router.get("/services/pdf/:id", verifyToken.verifyToken, (req, res) => {
  const id = req.params.id;
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      const headers = {
        headers: {
          authorization: `Bearer ${req.token}`
        }
      };
      const resultado = {};
      axios
        .get(`http://localhost:8080/api/services/${id}`, headers)
        .then(result => {
          pdf.test(result.data).then(r => res.send(r));
        });
    }
  });
});

module.exports = router;
