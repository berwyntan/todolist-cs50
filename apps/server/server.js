require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
// const morgan = require("morgan");
const db = require("./config/database");
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");
const userProtectedRouter = require("./routes/userProtectedRouter");

const PORT = process.env.PORT || 3000;
const app = express();

// postgres
try {
    db.authenticate();
    console.log('Connected to DB');
} catch (error) {
console.error('Unable to connect to the database:', error);
}

// app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.static("../client/dist"));

app.use("/api/user", userRouter);
app.use(verifyJWT);
app.use("/api/todo", todoRouter);
app.use("/api/userprotected", userProtectedRouter);

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("../client/dist/index.html"));
  });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})