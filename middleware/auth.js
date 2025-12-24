let Jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        let token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: `Token is not present`,
            })
        }
        // console.log(token);
        // console.log(process.env.JWT_SECRET);

        let decoded = Jwt.verify(token, process.env.JWT_SECRET);

        // console.log("Auth ke middle kaam kr raha h");
        // console.log(decoded);
        req.user = decoded;

        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: `Failed to decode in auth middleware`,
            err,
        })

    }
}

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== 'Student') {
            // console.log(req.user.role);
            throw new Error(`Tumhara role student ka nahi h`);
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: `Failed in isStudent middleware`,
            err,
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            console.log(req.user.role);
            throw new Error(`Tumhara role admin ka nahi h`);
        }
        // console.log("Admin ke middle kaam kr raha h");
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: `Failed in isAdmin middleware`,
            error : err.message
        })
    }

}