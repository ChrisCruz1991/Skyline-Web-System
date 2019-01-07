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

router.get("/services/notrelation/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * 
    from VEHICLE 
    where VEHICLE.vehicle_id not in 
    (select SERVICE_TICKET.VEHICLE_vehicle_id 
    from SERVICE_TICKET) 
    and 
    VEHICLE.GARAGE_garage_id = ?`,
    id,
    (err, result) => {
      if (err) throw err;
      else res.json(result);
    }
  );
});

router.post("/services/add", (req, res) => {
  const id = req.params.id;
  const {
    service_ticket_id,
    service_string,
    price_string,
    total,
    VEHICLE_vehicle_id,
    EMPLOYEE_employee_id
  } = req.body;

  console.log(VEHICLE_vehicle_id);
  const totalStr = total.split(",");

  let totalPrice = 0.0;

  for (let i = 0; i < totalStr.length; i++) {
    totalPrice += Number(totalStr[i]);
  }

  console.log(totalPrice.toFixed(2));

  // ('1', 'testing', 'testing', 500, 1000, 1);
  const INSERT_QUERY = `
  INSERT INTO  
  SERVICE_TICKET 
  ( service_string, price_string, total, VEHICLE_vehicle_id, EMPLOYEE_employee_id) 
  VALUES ?;`;

  const VALUES = [
    [
      service_string,
      price_string,
      totalPrice.toFixed(2),
      VEHICLE_vehicle_id,
      EMPLOYEE_employee_id
    ]
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
  console.log("alguin", req.body);
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
