const pool = require("../model/connection");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("./token");

router.get("/services/table", verifyToken.verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      pool.query(
        `SELECT
          service_ticket_id AS id,
          service_string AS services,
          price_string AS prices,
          total as total,
          VEHICLE_vehicle_id AS vehicle
          FROM SERVICE_TICKET 
          INNER JOIN VEHICLE ON 
          VEHICLE.vehicle_id = SERVICE_TICKET.VEHICLE_vehicle_id 
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

module.exports = router;
