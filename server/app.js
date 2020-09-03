const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV == 'test') {
    //  Connecting to a remote MongoDB remotely
    const dbUrltest = "mongodb+srv://Buzzroom:dreamworks1978@dream2works.krbu5.mongodb.net/test?retryWrites=true&w=majority";

    //  Connecting to a remote MongoDB locally
    const localDBtest = "mongodb://localhost/test";
    mongoose.connect(localDBtest, { useNewUrlParser: true, useUnifiedTopology: true });
} else {
    //  Connecting to a remote MongoDB remotely
    const dbUrlreal = "mongodb+srv://Buzzroom:dreamworks1978@dream2works.krbu5.mongodb.net/buzzroom?retryWrites=true&w=majority";

    //  Connecting to a remote MongoDB locally
    const localDBreal = "mongodb://localhost/buzzroom";
    mongoose.connect(localDBreal, { useNewUrlParser: true, useUnifiedTopology: true });
}

// middleware
if (!process.env.NODE_ENV == 'test') {
    app.use(morgan('dev'));
}
app.use(bodyParser.json());

// Routes
//      users route
app.use('/user', userRoutes);

// export app
module.exports = app
