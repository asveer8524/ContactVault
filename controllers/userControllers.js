const asyncHandler = require("express-async-handler");
const User=require("../models/userModel");
const bcrypt=require("bcrypt"); // This lib is used for password
const jwt=require("jsonwebtoken");

const registerUser=asyncHandler(
   async function(req,res){

    const {username,email,password}=req.body;

    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All feilds are mandetory");
    }

    const userAvailable=await User.findOne({email});

    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already exsist. cannot create");
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password,10);  // This hashed passowrd is what we will be storing in database
    console.log(`HAshed PAssword ${hashedPassword}`);

    const user= await User.create({
        username,
        email,
        password:hashedPassword
    })

    console.log(`User is Created`); 

    if(user)
    {
        res.status(201).json({
            _id:user.id, email:user.email
        });
    }
    else
    {
        res.status(400);
        throw new Error("User is not created");
    }

   }
);

const loginUser=asyncHandler(
    async function(req,res)
    {
        const {email,password} = req.body;

        if(!email || !password)
        {
            res.status(400);
            throw new Error("All feilds are mandetory");
        }

        const user= await User.findOne({email});

        //compare password with hashed passowrd
        if(user && (await bcrypt.compare(password,user.password)))
        {
            //generating access token
            const accessToken = jwt.sign({
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"15m"}
            );

            res.status(200).json({accessToken});
        }
        else{
            res.status(401);
            throw new Error("Email or Password is not valid");
        }

    }
);

const currentUser=asyncHandler(
    async function(req,res)
    {
        res.json(req.user);
    }
);

module.exports={registerUser,loginUser,currentUser};