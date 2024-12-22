//server app
const express = require('express');
const app = express();
const httpLogger = require('morgan');
const cors = require('cors');
const port = 3000;
const logSlowRequests= require('./middleware/logSlowRequests');
const userRouter = require('./userManagement/userRouter');

app.use(httpLogger('dev'));
app.use(cors()) 
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) 
app.use(logSlowRequests(100));
app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});