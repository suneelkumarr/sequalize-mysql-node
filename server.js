const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const db =  require('./database/index')

const user = require('./Routes/user.route')

port = process.env.PORT || 5000
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/',user)

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and Resync with { force: true }");
  });




// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.listen(port,(req, res)=>{
    console.log("server is running on port `${port}`");
    console.log(`http://localhost:${port}`);
})