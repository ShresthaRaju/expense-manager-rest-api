import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SCHEMA = mongoose.Schema;

const USERSCHEMA = new SCHEMA({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    familyName: {
        type: String,
        required: [true, 'Family name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email-address is required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    displayPicture: {
        type: String,
        default: "dp_placeholder.png"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//check if email exists already
UserSchema.statics.emailExists = async function (email) {
    let emailExists = await User.findOne({ email: email });
    return emailExists;
}

// compare login password with the actual password
UserSchema.methods.comparePassword = async function (plainPassword) {
    let matched = await bcrypt.compare(plainPassword, this.password);
    return matched;
}

// hide some attributes of user model while sending json response 
UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    delete user.createdAt;
    delete user.__v;
    return user;
};

const USER = mongoose.model('user', USERSCHEMA);
export default USER;