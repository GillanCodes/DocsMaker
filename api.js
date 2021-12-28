let express = require('express');
let app = express();

require('dotenv').config({path: "./config/.env"})
require('./config/dabatase')


app.use('/')


app.listen(process.env.PORT, () => {
    console.log("Listening on : " + process.env.PORT );
})