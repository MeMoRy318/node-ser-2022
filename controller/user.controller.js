const {getUsers, setUsers} = require("../fsServices/fsServices");

module.exports ={
    getAllUsers:async (req, res)=>{
        const users = await getUsers();
        res.status(200).json(users)
    },
    getUsersById:async (req, res)=>{
        const users = await getUsers();
        const {userById} = req.params;
        const index = users.findIndex(value => value.id === +userById);
        res.status(200).json(users[index])
    },
    createUsers:async (req, res)=>{

        const {name,age} = req.body;
        const users = await getUsers();
        const userId = users.length ? users.slice(-1)[0]['id'] + 1 : 1;

        users.push({name,age,id:userId});

        await setUsers(users);

        res.status(201).json({name,age,id:userId});
    },
    updateUsers:async (req, res)=>{
        const {userById} = req.params;
        const users = await getUsers();
        const index = users.findIndex(value => value.id === +userById)

        users.splice(index,1,{...users[index],...req.body});
        await setUsers(users);
        res.status(201).json({...users[index]})
    },
    deleteUsers:async (req, res)=>{
        const {userById} = req.params;
        const users = await getUsers();
        const index = users.findIndex(value => value.id === +userById);

        users.splice(index,1);
        await setUsers(users);
        res.sendStatus(204)
    }
}