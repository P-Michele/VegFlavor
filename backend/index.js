const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin: 'http://localhost:4200'}));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

//verifica la connessione
db.sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch((error) => {
  console.error("Unable to connect to the database: ", error);
});

//distrugge e ricrea il database
db.sequelize.sync({ force: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/user", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});