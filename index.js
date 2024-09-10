require("dotenv").config();
const app = require("./src/app");

const { db } = require("./src/database/config");
const relations = require("./src/models/relations");

const port = +process.env.PORT || 3000;

db.authenticate()
  .then(() => console.log("Database Autenticate"))
  .catch((err) => console.log(err));

relations();

db.sync({ force: true })
  .then(() => console.log("database Sync"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App running in port: ${port}`);
});
