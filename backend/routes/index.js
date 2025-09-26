const express = require('express');
const { userRouter } = require('./user');
const app = express();

app.use(express.json());

app.use("/api/v1/user",userRouter);