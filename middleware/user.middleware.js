const {getUsers} = require("../fsServices/fsServices");
module.exports = {
    checkGetUsersById:async (req,res,next)=>{

        const {userById} = req.params;
        const users = await getUsers();
        const index = users.findIndex(value => value.id === +userById);

        if (typeof +userById !== 'number' || +userById <=1 || index === -1){
            res.status(422).json({messages:'not found'})
        }
         next();
    },
    checkCreateUsers:async (req,res,next)=>{
        const {name,age} = req.body;

        if (typeof +age !== 'number' || +age <= 0 ){
            res.status(400).json({messages:'Bad Request'})
        }
        if (typeof name !== 'string' || name.length <= 2 ){
            res.status(400).json({messages:'Bad Request'})
        }
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
        next()
    },
    checkDeleteUser:async (req,res,next)=>{
        const {userById} = req.params;
        const users = await getUsers();
        const index = users.findIndex(value => value.id === +userById);

        if (index === -1){
            res.status(422).json(`User with id: ${userById} not found`);
        }
        next()
    }
}