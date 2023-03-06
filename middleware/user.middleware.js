const {getUsers, setUsers} = require("../fsServices/fsServices");
module.exports = {
    checkGetUsersById:async (req,res,next)=>{

        const {userById} = req.params;
        const users = await getUsers();
        const index = users.findIndex(value => value.id === +userById);

        if (index === -1){
            res.status(422).json({messages:'not found'})
        }
        req.user = users[index];
        next();
    },
    checkCreateUsers:async (req,res,next)=>{
        const {name,age} = req.body;
        const users = await getUsers();
        const userId = users.length ? users.slice(-1)[0]['id'] + 1 : 1;

        if (typeof +age !== 'number' || +age <= 0 ){
            res.status(400).json({messages:'Bad Request'})
        }
        if (typeof name !== 'string' || name.length <= 2 ){
            res.status(400).json({messages:'Bad Request'})
        }

        users.push({name,age,id:userId});
        await setUsers(users);
        req.user = {name,age,id:userId}
        next()
    },
    checkUpdateUsers:async (req,res,next)=>{
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

        req.user = {...users[index],...req.body}
        users.splice(index,1,{...users[index],...req.body});
        await setUsers(users);

        next()
    },
    checkDeleteUser:async (req,res,next)=>{
        const {userById} = req.params;
        const users = await getUsers();
        const index = users.findIndex(value => value.id === +userById);

        if (index === -1){
            res.status(422).json(`User with id: ${userById} not found`);
        }

        users.splice(index,1);
        await setUsers(users);

        next()
    }
}