const mongoose = require("mongoose");
const { constants } = require("../constants");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"],
    },
    email:{
        type:String,
        required:[true,"please add the user email address"],
        unique:[true,"Email already exsist"],
    },
    password:{
        type:String,
        required:[true,"please add the user email address"],
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("User",userSchema);