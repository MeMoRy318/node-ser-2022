const fs = require('node:fs/promises');

const path = require('node:path');


const getUsers = async ()=>{
    const users = await fs.readFile(path.join(process.cwd(),'dataBase','users.json'),{encoding:"utf-8"})
    return users ? JSON.parse(users) : []
}

const setUsers = async (users) =>{
    await fs.writeFile(path.join(process.cwd(),'dataBase','users.json'),JSON.stringify(users))
}


module.exports =  {
    getUsers,
    setUsers
}