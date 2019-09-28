import mongoose from 'mongoose';
import User from './User';
import Category from './Category';

const SCHEMA = mongoose.Schema;

const TRANSACTIONSCHEMA = new SCHEMA({
    memo: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        trim: true
    },
    category: {
        type: SCHEMA.Types.ObjectId,
        ref: Category
    },
    date: {
        type: Date,
        default: Date.now
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

TRANSACTIONSCHEMA.methods.toJSON = function () {
    let transaction = this.toObject();
    delete transaction.createdAt;
    delete transaction.__v;
    return transaction;
};

const TRANSACTION = mongoose.model('transaction', TRANSACTIONSCHEMA);
export default TRANSACTION;