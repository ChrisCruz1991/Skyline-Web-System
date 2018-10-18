var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send('respond with a resource');

  res.json([
    {
      id: 1,
      username: "Christopher"
    },
    {
      id: 2,
      username: "Stacey"
    },
    {
      id: 3,
      username: "Ibzan"
    },
    {
      id: 4,
      username: "Diana"
    }
  ]);
});

module.exports = router;
