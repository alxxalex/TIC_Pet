//server app
const express = require('express');
const app = express();
const httpLogger = require('morgan');
const cors = require('cors');
const port = 3000;
const logSlowRequests= require('./middleware/logSlowRequests');
const userRouter = require('./userManagement/userRouter');
const cookieParser = require('cookie-parser');

app.use(httpLogger('dev'));
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) 
app.use(logSlowRequests(100));
app.use(cookieParser());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});