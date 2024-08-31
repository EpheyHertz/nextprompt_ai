import mongoose from "mongoose";
import {Schema,model,models} from 'mongoose';
 const UserSchema=new Schema({
    email:{
        type:String,
        unique:[true,'Email already exists!'],
        required:[true,'Email is Required!'],

    },
    username:{
        type:String,
        required:[true,'Username is Required!'],
        match: [/^[a-zA-Z0-9_]{5,30}$/, 'Username must be between 5 and 30 characters and can only contain letters, numbers, and underscores.'],

    },
    image:{
        type:String,
    },
   
 });

 const User = models.User || model("User",UserSchema);

 export default User;