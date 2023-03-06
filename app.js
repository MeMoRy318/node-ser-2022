const express = require('express');

const userRouter = require('./router/user.router');


const PORT = 5100;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/users',userRouter);

app.listen(PORT,()=>console.log(`server start ${PORT}`));


