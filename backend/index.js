const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp=require("hpp");
const routes = require("./routes");
const db = require("./models");
const { rateLimit } = require('express-rate-limit');
const path = require('path');

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

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
app.use(helmet());
app.use(hpp());


// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});