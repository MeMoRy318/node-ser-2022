const fs = require('node:fs/promises');
const path = require('node:path');

const reader = async ()=>{
    const data = await fs.readFile(path.join(process.cwd(),'dataBase','users.json'),{encoding:"utf-8"});
    return data ? JSON.parse(data):[];
}

const writer = async (data)=>{
    await fs.writeFile(path.join(process.cwd(),'dataBase','users.json'), JSON.stringify(data));
}

module.exports ={
    reader,
    writer
}