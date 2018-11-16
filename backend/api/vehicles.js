const pool = require("../model/connection");
const express = require("express");
const router = express.Router();

router.get("/vehicle", (req, res) => {
  pool.query("SELECT * FROM VEHICLE", (err, result) => {
    if (err) throw err;
    return res.send({ data: result });
  });
});

router.get("/vehicle/:id", (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM VEHICLE WHERE vehicle_id=${id}`, (err, result) => {
    if (err) throw err;
    return res.send({ data: result });
  });
});

module.exports = router;
