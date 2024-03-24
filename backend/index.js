const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const routes = require("./routes");
const db = require("./models");
const { rateLimit } = require('express-rate-limit');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
}));

db.sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch((error) => {
  console.error("Unable to connect to the database: ", error);
});
db.sequelize.sync();

app.use(express.json());

app.use(helmet());
app.use(hpp());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});