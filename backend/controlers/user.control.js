// const { use } = require("react");
const User = require("../module/user.module");
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {

    try {

        const { email, password } = req.body
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            email :email.trim(), password: hashed
        });

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        // Never send the password hash back to the client, even hashed.
        const { password: _password, ...safeUser } = user.toObject();

        res.status(200).json({
            message: "Login successful",
            user: safeUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};




const getUser= async (req,res)=>{
    try {

      const user=await User.find()

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

const updateUser = async (req, res) => {

    try {

        const myId = req.params.id;
        const {email,password}=req.body
        const updateDate={}
        if(email){
            updateDate.email=email
        }
        if(password){
            updateDate.password = await bcrypt.hash(password,10)
        }

        const user = await User.findByIdAndUpdate(
            myId,
            updateDate,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    getUser
};