const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const {connectToDatabase} = require("./helpers/dbconnect");
const {authRoutes, adminRoutes, userRoutes} = require("./src/routes/index");
const {authenticate} = require("./middleware/authenticate");



connectToDatabase();


const app = express();
      

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(authenticate);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);


app.use((req, res, next) => {
    res.status(404).send("Sorry, we couldn't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Somthing went wrong!");
});


app.listen(config.port, () => {
    console.log(`DB is running on port ${config.port}`);
});

