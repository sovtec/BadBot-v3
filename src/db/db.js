const mysql = require("mysql");

const loginType = "url"; // URL or Object
module.exports = (client) => {
  const options =
    loginType.toLowerCase() === "url"
      ? { connectionString: process.env.DATABASE_URL }
      : {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DATABASE,
        };
  client.db = mysql.createConnection(options);

  client.db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
  });
};
