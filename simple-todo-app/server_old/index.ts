import express from 'express';
import cors from 'cors';

const fs = require('fs')
let {pool: pool} = require("./src/app/db")
const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(cors());

require('./src/app/routes/task.routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server listening  on ${PORT}`);
})

export default app;