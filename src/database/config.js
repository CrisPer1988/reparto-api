const { Sequelize } = require("sequelize");

const db = new Sequelize({
  // dialect: process.env.DB_DIALECT,
  // host: process.env.DB_HOST,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  host: process.env.POSTGRES_DB__HOST,
  username: process.env.POSTGRES_DB__USER,
  password: process.env.POSTGRES_DB__PASSWORD,
  database: process.env.POSTGRES_DB__DATABASE,
  logging: false,
  // con esto consegui conectar db postgres de azure
  dialectOptions: {
    ssl: {
      require: true, // Esto ayuda. Pero genera un nuevo error.
      rejectUnauthorized: false, // Esta línea solucionará el nuevo error.
    },
  },
});

module.exports = { db };
