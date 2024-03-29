const bodyParser = require("body-parser")
const Express = require("express")
const Mongoose = require("mongoose")
const cors = require("cors")
const config = require("../Config/config")

var app = Express();
const mongodbUrl = config.MONGODB_URL;

// create DataBase 
Mongoose
    .connect(mongodbUrl, { useNewUrlParser: true,  useUnifiedTopology: true  })
    .then(() => console.log('successfully connected mongo db atlas'))
    .catch((err) => console.log(err));
  
    ///router connect
const routes = require('../Routes/index')
const imageRoute = require('../Middleware/middleware')

    app.use(cors());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(Express.static('public'));

    const Port = config.PORT

    app.use('/vr', routes);

    app.use('/image', imageRoute);

    const Server = app.listen(Port, function () {
        console.log('server Lisening on Port :' + Port);
    })