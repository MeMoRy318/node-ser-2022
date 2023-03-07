const {writer,reader} = require('./fs.services')
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = 5100;

app.listen(PORT,()=>{
    console.log(`server listen ${PORT}`)
});

app.get('/users',async (req, res)=>{
    const data = await reader();
    res.status(200).json(data)
})

app.post('/users', async (req, res)=>{
    const {name,age,gender} = req.body;
    const data = await reader();
    data.push({name,age,gender,id:data.length ? data.slice(-1)[0]['id'] + 1 : 1 });
    await writer(data);
    res.status(201).json({...req.body});
})

app.get('/users/:userId', async (req, res)=>{
    const {userId} = req.params;
    const data = await reader();
    const index = data.findIndex(value => value.id === +userId);
    res.status(200).json(data[index]);
})

app.delete('/users/:userId', async (req, res)=>{
    const {userId} = req.params;
    const data = await reader();
    const index = data.findIndex(value => value.id === +userId);
    data.splice(index,1);
    await writer(data);
    res.sendStatus(204);
})