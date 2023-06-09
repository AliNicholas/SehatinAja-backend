require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/authRoute");
const diseaseRoute = require("./routes/diseaseRoute");
const doctorRoute = require("./routes/doctorRoute");
const testRoute = require("./routes/testRoute");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "connection success" });
});

app.use(authRoute);
app.use(diseaseRoute);
app.use(doctorRoute);
app.use("/tests", testRoute);

app.use((err, req, res, next) => {
  // err handling
  res.send(err);
  next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
