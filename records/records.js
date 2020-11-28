const fs = require('fs');
const db = './records/data.json';

function generateRandomId(){
    return Math.floor(Math.random() * 1000);
}

function save(data){
    return new Promise((resolve, reject) => {
        fs.writeFile(db, JSON.stringify(data, null, 2), (err) => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function getUsers(){
    return new Promise((resolve, reject) => {
        fs.readFile(db, 'utf8', (err, data) => {
            if(err) {
                reject(err);
            } else {
                const json = JSON.parse(data);
                resolve(json);
            }
        });
    });
}

async function createUser(newUser) {
    const users = await getUsers();
    newUser.id = generateRandomId();
    users.records.push(newUser);
    await save(users);
    return newUser;
}

async function getUsersById(id) {
    const users = await getUsers();
    return users.records.find(record => record.id == id);
}

async function getUsersByEmail(email) {
    const users = await getUsers();
    return users.records.find(record => record.email == email);
}
module.exports = {
    getUsers,
    createUser,
    save,
    getUsersById,
    getUsersByEmail
}