const express = require('express')
const cors = require('cors')
const fs = require('fs')
let {pool: pool} = require("./src/app/db")
const PORT = process.env.PORT || 3005;
const app = express()
app.use(express.json());
app.use(cors());
require('./src/app/routes/tasks.js')(app);

app.listen(PORT, () => {
    console.log(`Server listening  on ${PORT}`);
})