const express = require("express");
const authRoutes = require("./routes/authRoute");

const app = express();
app.use(express.json());

// routes
app.use(authRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
