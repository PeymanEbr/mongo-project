const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoproject')
.then(() => {console.log('connected to mongodb')})
.catch((err) => {'could not connect to mongodb'});

const userScema = new mongoose.Schema({
    first_name: {type: String , minLength: 3, maxLength: 20, lowercase: true},
    salary: {type:String, required: true, set: v=> Math.round(v),get: v=> Math.round(v)},
    last_name: {type: String, required: true},
    age: {type: Number, min: 8, max: 120},
    favorites: {type: [String],validate :{
        validator: function(v){
            return v && v.length>0;
        },
        message: 'favorite field should have at least one item'
    }, enum: [
        "sport",
        "data science",
        "programming"
    ]},
    data: {type: Date, default: Date.now},
    admin: Boolean,
});

const User = mongoose.model('User',userScema);

async function createUser(){
    
const user = new User({
    first_name: 'farhad',
    salary: 14.6,
    last_name: 'salimi',
    favorites: ['programming'],
    admin: false,
});

try{
    const result = await user.save();
    console.log(result);
}catch(ex) {
    console.log(ex.message);
}

}

// createUser();

async function getUsers(){
   const users = await User.find();
   console.log(users);
}

// getUsers();

async function updateUser(id){
    const result =  await User.findByIdAndUpdate(id,{
        $set:{
            first_name: 'updated name 4'
        }
    },{new: true});
    // const user1 = await User.findOne({_id: id});
    // const user2 = await User.find({_id: id});
    // if(!user) return;
    // user.admin = true;
    // user.first_name = "updated name";

    // user.set({
    //     first_name : 'updated name',
    //     admin: true
    // })

    // const result = await user.save();
    console.log(result);


}

// updateUser("63a57463b0806d8def32976b");

async function removeUser(id){
    const user = await User.findByIdAndRemove(id);
    console.log(user);
}

// removeUser("63a57463b0806d8def32976b");