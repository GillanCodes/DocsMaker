let express = require('express');
let app = express();

require('dotenv').config({path: "./config/.env"})
require('./config/dabatase')

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let cors = require('cors')
const corsOptions = {
    origin : process.env.CLIENT_URL,
    'credentials': true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));


let docsRoutes = require('./routes/doc.routes')
app.use('/docs', docsRoutes);


app.listen(process.env.PORT, () => {
    console.log("Listening on : " + process.env.PORT );
})