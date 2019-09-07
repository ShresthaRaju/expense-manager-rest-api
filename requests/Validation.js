import Joi from '@hapi/joi';

const OPTIONS = {
    language: {
        key: '{{label}} '
    }
};

// sign up validation
const SIGNUP = (signUpData) => {
    const signUpSchema = Joi.object().keys({
        firstName: Joi.string().min(2).max(20).required().label("First name"),
        familyName: Joi.string().min(2).max(20).required().label("Family name"),
        email: Joi.string().email({ minDomainSegments: 2 }).required().label("Email"),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(15).required().label("Password"),
    });

    return Joi.validate(signUpData, signUpSchema, OPTIONS);
}

// sign in validaiton
const SIGNIN = (signInData) => {
    const signInSchema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required().label("Email"),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(8).max(15).required().label("Password"),
    });

    return Joi.validate(signInData, signInSchema, OPTIONS);
}

const ADDCATEGORY = (categoryData) => {
    const addCategorySchema = Joi.object().keys({
        name: Joi.string().min(2).max(30).required().label("Category name"),
        type: Joi.string().valid(['Expense', 'Income']).required().label("Category type"),
        creator: Joi.string().required().label("Creator")
    });

    return Joi.validate(categoryData, addCategorySchema, OPTIONS);
}

const NEWTRANSACTION = (transactionData) => {
    const newTransactionSchema = Joi.object().keys({
        memo: Joi.string().min(1).max(50).required().label("Memo"),
        amount: Joi.number().min(1).required().label("Amount"),
        type: Joi.string().valid(['Expense', 'Income']).required().label("Transaction type"),
        date: Joi.date().required().label("Date"),
        creator: Joi.string().required().label("Creator")
    });

    return Joi.validate(transactionData, newTransactionSchema, OPTIONS);
}

module.exports = {
    SIGNUP, SIGNIN, ADDCATEGORY, NEWTRANSACTION
}