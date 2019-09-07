import mongoose from 'mongoose';

const SCHEMA = mongoose.Schema;

const CATEGORYSCHEMA = new SCHEMA({
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
        name: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CATEGORY = mongoose.model('category', CATEGORYSCHEMA);
export default CATEGORY;