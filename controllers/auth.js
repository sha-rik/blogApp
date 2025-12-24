let Otp = require('../models/otpModel');
let User = require('../models/userModel');
let Otp_Generator = require('otp-generator');
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Jwt = require('jsonwebtoken');
require('dotenv').config();
exports.sendOtp = async function (req, res) {
    try {
        const { email } = req.body;
        let checkUserAllReadyPresent = await User.findOne({ email });
        if (checkUserAllReadyPresent) {
            throw new Error(`Email : ${email} already registered`);

        }
        console.log("yahd tak reach ho raha h");
        let otp = Otp_Generator.generate(
            6,
            {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
                digits: true,
            }
        );

        // check kr rahe h ki.. jo OTP aayaa h wo unique h ya nahi?
        let checkOtpAllReadyPresent = await Otp.findOne({ otp });
        while (checkOtpAllReadyPresent) {
            otp = Otp_Generator.generate(
                6,
                {
                    upperCaseAlphabets: false,
                    specialChars: false,
                    lowerCaseAlphabets: false,
                    digits: true,
                });
            checkOtpAllReadyPresent = await Otp.findOne({ otp });
        }

        // ab hm otp ka object create karenge aur database me entry karayenge
        let otpObject = {
            email: email,
            otp: otp,
        }

        let otpEntry = await Otp.create(otpObject);
        return res.status(200).json({
            success: true,
            message: `OTP sent successfully to email : ${email}`,
            data: otpEntry,
        })



    }
    catch (err) {
        console.log(err);
    }
}

exports.signup = async function (req, res) {
    try {
        let { firstName, lastName, email, password, otp, role } = req.body;
        if (!firstName) {
            throw new Error(`Please fill the first name`);
            // throw new Error(`Email : ${email} already registered`);
        }
        if (!lastName) {
            throw new Error(`Please fill the last name`);
        }
        if (!email) {
            throw new Error(`Please fill email`);
        }
        if (!password || password.length < 6) {
            throw new Error('Length of password must be more than 6');
        }
        if (!role) {
            throw new Error(`Please choose a legit role`);
        }
        let latest_otp= await Otp.findOne({ email }).sort({ createdAt: -1 });
        console.log(latest_otp);
        if (!latest_otp || latest_otp.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: `Invalid OTP for email ${email}`,
            })
        }
        console.log("Signup me yaha tak aa gaye h");

        if (await User.findOne({ email })) {
            return res.status(409).json({
                success: false,
                message: `Email ${email} already registered`,
            })
        }
        // password ko encrypt krna
        let hashedPassword = await bcrypt.hash(password, 10);
        let approved = "";
        approved === "Admin" ? (approved = false) : (approved = true);
        let user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            approved: approved,
            role: role

        })

        return res.status(201).json({
            success: true,
            message: `Its not a good practice  but for now ${user}`,
        })


    }
    catch (err) {
        console.log(err);
    }
}

exports.login = async function (req, res) {
    try {
        let { email, password } = req.body;
        if (!email) {
            throw new Error('Please enter Email');
        }
        if (password.length <= 6) {
            throw new Error('Length of password must be greate than 6')
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Email id : ${email} is not registered`,
            })
        }
        // console.log(password," ---->");
        // console.log(user.password);
        let password_check= await bcrypt.compare(password, user.password)
        console.log(password_check);
        if (!password_check) {
            return res.status(401).json({
                success: false,
                message: `The password is wrong`
            })
        }

        let payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        }
        console.log(payload);

        let token = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2m',
        });

        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 2* 60 * 1000),
            httpOnly: true,
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: 'Loged in Successfully',
        })
    }
    catch (error) {
        console.log(error);
    }
}