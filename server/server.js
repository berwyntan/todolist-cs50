require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const corsOptions = require("./config/corsOptions");
const morgan = require("morgan");
const db = require("./config/database");

const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");

const PORT = process.env.PORT || 3000;
const app = express();

// postgres
try {
    db.authenticate();
    console.log('Connected to ElephantSQL');
} catch (error) {
console.error('Unable to connect to the database:', error);
}

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.get("/", (req, res) => {res.json({msg: "hello world"})});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})