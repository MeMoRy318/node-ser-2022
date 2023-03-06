const {getUsers} = require("../fsServices/fsServices");

module.exports ={
    getAllUsers:async (req, res)=>{
        const users = await getUsers();
        res.status(200).json(users)
    },
    getUsersById:async (req, res)=> res.status(200).json(req.user),
    createUsers:async (req, res)=>res.status(201).json(req.user),
    updateUsers:async (req, res)=> res.status(201).json({...req.user}),
    deleteUsers:async (req, res)=> res.sendStatus(204)
}