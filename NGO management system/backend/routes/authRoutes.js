const express = require("express");
const router = express.Router();

const User = require("../models/User");


// Signup API
router.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await User.findOne({
            email: email
        });


        if (existingUser) {

            return res.json({
                message: "User already exists"
            });

        }


        const newUser = new User({

            name: name,
            email: email,
            password: password

        });


        await newUser.save();


        res.json({

            message: "Signup successful"

        });


    }
    catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"

        });

    }

});



// Login API
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({

            email: email,
            password: password

        });



        if (!user) {

            return res.json({

                message: "Invalid login"

            });

        }



        res.json({

            message: "Login successful",
            name: user.name

        });


    }
    catch(error) {

        res.status(500).json({

            message: "Server error"

        });

    }

});



module.exports = router;