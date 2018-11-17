const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const clientRoute = require("./api/clients");
const vehicleRoute = require("./api/vehicles");
const employeeRoute = require("./api/employees");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/*
  Enabling CORS for api use with front-end code
*/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/*
  Api routes
*/
app.use("/api", clientRoute);
app.use("/api", vehicleRoute);
app.use("/api", employeeRoute);

// default route
app.get("/", function(req, res) {
  return res.send({ error: true, message: "hello" });
});

app.all("*", (req, res, next) => {
  return res.send("request not found");
  next();
});

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(PORT, () => {
  console.log("Node app is running on port " + PORT);
});
