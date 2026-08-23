
const User = require("../module/user.module");
const bcrypt = require("bcrypt");

const createUser = async () => {
    try {
        const admins = [
            {
                username: process.env.ADMIN_USERNAME,
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                isBackup: false
            },
            {
                username: process.env.BACKUP_ADMIN_USERNAME,
                email: process.env.BACKUP_ADMIN_EMAIL,
                password: process.env.BACKUP_ADMIN_PASSWORD,
                isBackup: true
            }
        ];

        for (const admin of admins) {

            // Skip if .env data is missing
            if (
                !admin.username ||
                !admin.email ||
                !admin.password
            ) {
                console.log(
                    `Missing environment variables for ${
                        admin.isBackup ? "backup" : "main"
                    } admin`
                );

                continue;
            }

            const email = admin.email
                .toLowerCase()
                .trim();

            // Check if user already exists
            const existingUser = await User.findOne({
                email
            });

            // Don't create duplicate users
            if (existingUser) {
                continue;
            }

            // Hash password before saving
            const hashedPassword = await bcrypt.hash(
                admin.password,
                10
            );

            await User.create({
                username: admin.username.trim(),
                email,
                password: hashedPassword,
                isBackup: admin.isBackup
            });

            console.log(
                `${admin.isBackup ? "Backup" : "Main"} admin created`
            );
        }

    } catch (error) {

        console.error(
            "Failed to create default admins:",
            error.message
        );

    }
};


// Login
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        // Never send password to frontend
        const {
            password: _password,
            ...safeUser
        } = user.toObject();

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


// Get Main Admin only
const getUser = async (req, res) => {

    try {

        const users = await User
            .find({ isBackup: false })
            .select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// Update Main Admin
const updateUser = async (req, res) => {

    try {

        const myId = req.params.id;

        const {
            username,
            email,
            password
        } = req.body;

        const updateData = {};

        if (username) {
            updateData.username = username.trim();
        }

        if (email) {
            updateData.email = email.toLowerCase().trim();
        }

        // Password is optional.
        // Empty password = keep old password.
        if (password && password.trim()) {

            updateData.password = await bcrypt.hash(
                password.trim(),
                10
            );

        }

        const user = await User.findOneAndUpdate(
            {
                _id: myId,
                isBackup: false
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "Main admin not found"
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
}
