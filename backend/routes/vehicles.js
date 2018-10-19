var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.json([
    {
      vin_num: 123456789,
      make: "Honda",
      model: "Civic",
      year: 2005
    },
    {
      vin_num: 987654321,
      make: "Toyota",
      model: "Corolla",
      year: 2005
    },
    {
      vin_num: 555555555,
      make: "Mitsubishi",
      model: "Lancer",
      year: 2008
    }
  ]);
});

module.exports = router;
