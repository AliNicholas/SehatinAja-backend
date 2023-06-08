require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/authRoute");
// const usersRoutes = require("./routes/users");
// const diseasesRoutes

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "connection success" });
});

app.use(authRoute);
// app.use(usersRoutes);
// app.use(diseasesRoutes);
// app.use(doctorsRoutes);

app.use((err, req, res, next) => {
  // err handling
  res.send(err);
  next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
