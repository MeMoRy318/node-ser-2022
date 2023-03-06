const express = require('express');

const {getUsers,setUsers} = require('./fsServices/fsServices');


const PORT = 5100;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT,()=>console.log(`server start ${PORT}`));


app.get('/users',async (req, res)=>{
    const users = await getUsers();
    res.status(200).json(users)
});


app.get('/users/:userById',async (req, res)=>{
    const users = await getUsers();
    const {userById} = req.params;
    const index = users.findIndex(value => value.id === +userById);

    if (typeof +userById === 'number' && +userById >=1 && index !== -1){
        res.status(200).json(users[index])
    }else {
        res.status(422).json({messages:'not found'})
    }
});


app.post('/users',async (req, res)=>{
    const {name,age} = req.body;

    if (typeof +age !== 'number' || +age <= 0 ){
        res.status(400).json({messages:'Bad Request'})
    }
    if (typeof name !== 'string' || name.length <= 2 ){
        res.status(400).json({messages:'Bad Request'})
    }

    const users = await getUsers();
    const userId = users.length ? users.slice(-1)[0]['id'] + 1 : 1;
    users.push({name,age,id:userId});
    await setUsers(users);
    res.status(201).json({name,age,id:userId});
})

app.put('/users/:userById',async (req, res)=>{
    const {userById} = req.params;
    const {name,age} = req.body;
    const users = await getUsers();
    const index = users.findIndex(value => value.id === +userById)

    if (index === -1)res.status(422).json({messages:'Not Found'})
    if (typeof name !== 'string' || name.length <= 2 ){
        res.status(400).json({messages:'Bad Request'})
    }
    if (typeof +age !== 'number' || +age <= 0 ){
        res.status(400).json({messages:'Bad Request'})
    }

    users.splice(index,1,{...users[index],...req.body});
    await setUsers(users);
    res.status(201).json({...users[index]})
})

app.delete('/users/:userById',async (req, res)=>{
    const {userById} = req.params;
    const users = await getUsers();
    const index = users.findIndex(value => value.id === +userById);

    if (index !== -1){
        users.splice(index,1);
        await setUsers(users);
        res.sendStatus(204)
    }else {
        res.status(422).json(`User with id: ${userById} not found`);
    }
})