// const { Sequelize } = require("sequelize");
// const pg = require("pg");

// const db = new Sequelize({
//   dialect: process.env.DB_DIALECT,
//   dialectModule: pg,
//   host: process.env.DB_HOST,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   logging: false,
//   timezone: "+00:00", // UTC
//   dialectOptions: {
//     useUTC: true, // Para asegurar que Sequelize maneje las fechas en UTC
//     dateStrings: true, // Para tratar las fechas como cadenas
//   },

//   // con esto consegui conectar db postgres de azure
//   dialectOptions: {
//     ssl: {
//       require: true, // Esto ayuda. Pero genera un nuevo error.
//       rejectUnauthorized: false, // Esta línea solucionará el nuevo error.
//     },
//   },
// });

// module.exports = { db };

const { Sequelize } = require("sequelize");
const pg = require("pg");

const db = new Sequelize({
  dialect: process.env.DB_DIALECT || "postgres",
  dialectModule: pg,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  timezone: "+00:00", // UTC
  dialectOptions: {
    useUTC: true, // Para asegurar que Sequelize maneje las fechas en UTC
    dateStrings: true, // Para tratar las fechas como cadenas
    ssl: {
      require: true,
      rejectUnauthorized: false, // Esto soluciona errores de SSL
    },
    connectTimeout: 60000, // Aumenta el tiempo de espera a 60 segundos
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000, // Aumenta el tiempo de adquisición a 60 segundos
    idle: 10000,
  },
});

module.exports = { db };
