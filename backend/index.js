const express = require("express");
require("dotenv").config();
const cors = require("cors");

const bearerToken = require("express-bearer-token");
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/dbConnect");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoutes");

const PORT = process.env.PORT || 5500;

dbConnect();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookieParser());
app.use(bearerToken());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the server",
  });
});

app.use("/api/user/", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up and listening on PORT ${PORT}`);
});
