const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

const HTTP_PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});
