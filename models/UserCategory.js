import mongoose from 'mongoose';
import User from './User';

const SCHEMA = mongoose.Schema;

const USERCATEGORYSCHEMA = new SCHEMA({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Category type is required'],
        trim: true
    },
    icon: {
        type: String,
        default: "others.png"
    },
    creator: {
        type: SCHEMA.Types.ObjectId,
        ref: User
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//check if category exists already
USERCATEGORYSCHEMA.statics.existsAlready = async function (name, type, creator) {
    let categoryExists = await USERCATEGORY.findOne({ name: name, type: type, creator: creator });
    return categoryExists;
}

USERCATEGORYSCHEMA.methods.toJSON = function () {
    let category = this.toObject();
    delete category.createdAt;
    delete category.creator;
    delete category.__v;
    return category;
};

const USERCATEGORY = mongoose.model('user_category', USERCATEGORYSCHEMA);
export default USERCATEGORY;