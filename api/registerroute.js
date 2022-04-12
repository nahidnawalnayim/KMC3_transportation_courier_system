const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const User=require('../schema/userSchema');


app.use(bodyParser.urlencoded({extended:false}));

router.get('/',(req,res,next)=>{
    res.status(200).render("login")
})

router.post("/", async (req, res, next) => {

    var username = req.body.username.trim();
    var password = req.body.password.trim();
    var email = req.body.email.trim();
    var message = req.body.message.trim();
    var payload = req.body

    if(username && password) {
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email },
                {message: message}
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });

        if(user == null) {
            // No user found
            var data = req.body;
           

            User.create(data)
            .then((user) => {
                req.session.user = user;
                return res.redirect("/");
            })
        }
        else {
            // User found
            if (email == user.email) {
                payload.errorMessage = "Username already in use.";
            }
            else {
                payload.errorMessage = "sds already in use.";
            }
            res.status(200).render("login", payload);
        }
    }
    else {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("login", payload);
    }
})
module.exports=router;  