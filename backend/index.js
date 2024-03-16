const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");
const db = require("./models");
//helmet, hpp, express rate limit
const app = express();
const port = process.env.PORT || 3000;

/* app.use(cors({
  origin: '*',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
})); */
app.use(cors({origin: 'http://localhost:4200'}));
//app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

//verifica la connessione
db.sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch((error) => {
  console.error("Unable to connect to the database: ", error);
});

//distrugge e ricrea il database
db.sequelize.sync({ force: true });

app.use(helmet());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});