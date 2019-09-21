import mongoose from 'mongoose';

const SCHEMA = mongoose.Schema;

const DEFAULTCATEGORYSCHEMA = new SCHEMA({
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    icon: {
        type: String
    }
});

const DEFAULTCATEGORY = mongoose.model('default_category', DEFAULTCATEGORYSCHEMA);
export default DEFAULTCATEGORY;