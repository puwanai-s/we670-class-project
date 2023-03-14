const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const middleware = require('./middleware/index');

const indexRouter = require('./routes/index');
const articleRouter = require('./routes/article');

const app = express();
const port = 3001;

// mongodb connect
const mongoose = require('mongoose');
mongoose.connect(process.env.connectionString, {
    useNewUrlParser: true
});

// express use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// index
app.use('/', indexRouter);

// auth
app.use(middleware.decodeToken);

// manage article
app.use('/article', articleRouter);

// listen
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});