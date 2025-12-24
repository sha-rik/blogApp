let mongoose = require('mongoose');
let {mailSender} = require('../utils/mailSender');
let {emailTemplate} = require('../email/template');

let otpSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    otp: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // 5 minutes
    }
})
let sending_function = async function (next) {
    try {
        console.log(`otpSchema.pre run kiya gaya h`);
        if (this.isNew) {
            let mailResponce = await mailSender(
                this.email,
                "Your BlogApp OTP Verification",
                emailTemplate(this.otp),
            );
            console.log("Email sent successfully: ", mailResponce.response);
        }
    }
    catch (error) {
        console.log("Error while sending email", error);
    }
    next();

}
otpSchema.pre('save', sending_function)

module.exports = mongoose.model('OTP', otpSchema);