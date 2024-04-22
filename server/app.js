const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

const movieRoutes = require("./routes/movie");
const auth = require("./middleware/auth");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Sử dụng middleware cho tất cả các route
app.use(auth);

app.use("/api/movies", movieRoutes);

app.get("/notfound404", (req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
