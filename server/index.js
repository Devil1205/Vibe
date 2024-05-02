const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const cookierParser = require('cookie-parser');
const { connect } = require('./db/db');

//connecting mongodb
connect();

//cors fix
app.use(cors({origin: ["http://localhost:5173"], credentials: true},));

//middlewares
app.use(express.json({limit: "5mb"}));
app.use(cookierParser());

//routes
app.use("/api/v1", require("./routes/userRoute"));
app.use("/api/v1", require("./routes/postRoute"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})