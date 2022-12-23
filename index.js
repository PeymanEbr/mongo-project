const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoproject')
.then(() => {console.log('connected to mongodb')})
.catch((err) => {'could not connect to mongodb'});

const userScema = new mongoose.Schema({
    first_name: String,
    last_name: {type: String, required: true},
    favorites: [String],
    data: {type: Date, default: Date.now},
    admin: Boolean,
});

const User = mongoose.model('User',userScema);

async function createUser(){
    
const user = new User({
    first_name: 'yashar',
    last_name: 'salimi',
    favorites: ['programmin','money', 'swimming'],
    admin: false,
});

const result = await user.save();
console.log(result);
}

// createUser();

async function getUsers(){
    const pageNumber = 1;
    const pageSize = 8;
   const users = await (await User.find()).and([{first_name:"payman"},{admin: true}])
   .skip((pageNumber - 1) * pageSize)
   .limit(pageSize)
   console.log(users);
}

getUsers();