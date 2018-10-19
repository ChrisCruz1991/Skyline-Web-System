var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send('respond with a resource');

  res.json([
    {
      id: 1,
      username: "Christopher",
      age: 27
    },
    {
      id: 2,
      username: "Stacey",
      age: 21
    },
    {
      id: 3,
      username: "Ibzan",
      age: 22
    },
    {
      id: 4,
      username: "Diana",
      age: 24
    }
  ]);
});

module.exports = router;
