const express = require('express');

const userRouter = require('./router/user.router');

require('dotenv').config()


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/users',userRouter);

app.listen(process.env.PORT,()=>console.log(`Server listen ${process.env.PORT}`));


