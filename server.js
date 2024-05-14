require("dotenv").config();
const app = require("./app");

const { db } = require("./src/database/config");
const initModel = require("./src/models/initModel");

const port = +process.env.PORT || 3000;

db.authenticate()
  .then(() => console.log("Database Autenticate"))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then(() => console.log("Sync"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App running in port: ${port}`);
});
