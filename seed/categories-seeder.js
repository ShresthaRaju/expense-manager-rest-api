
import mongoose from 'mongoose';
import DefaultCategory from '../models/DefaultCategory';

mongoose.connect("mongodb://127.0.0.1:27017/expense_manager", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

let defaultCategories = [
    new DefaultCategory({
        name: "Food",
        type: "Expense",
        icon: "food.png"
    }),
    new DefaultCategory({
        name: "Transportation",
        type: "Expense",
        icon: "transportation.png"
    }),
    new DefaultCategory({
        name: "Entertainment",
        type: "Expense",
        icon: "entertainment.png"
    }),
    new DefaultCategory({
        name: "Travel",
        type: "Expense",
        icon: "travel.png"
    }),
    new DefaultCategory({
        name: "Education",
        type: "Expense",
        icon: "education.png"
    }),
    new DefaultCategory({
        name: "Bills",
        type: "Expense",
        icon: "bills.png"
    }),
    new DefaultCategory({
        name: "Mobile",
        type: "Expense",
        icon: "mobile.png"
    }),
    new DefaultCategory({
        name: "Cigarette",
        type: "Expense",
        icon: "cigarette.png"
    }),
    new DefaultCategory({
        name: "Shopping",
        type: "Expense",
        icon: "shopping.png"
    }),
    new DefaultCategory({
        name: "Beauty",
        type: "Expense",
        icon: "beauty.png"
    }),
    new DefaultCategory({
        name: "Gadgets",
        type: "Expense",
        icon: "gadgets.png"
    }),
    new DefaultCategory({
        name: "Others",
        type: "Expense",
        icon: "others.png"
    }),
    new DefaultCategory({
        name: "Salary",
        type: "Income",
        icon: "salary.png"
    }),
    new DefaultCategory({
        name: "Incentive",
        type: "Income",
        icon: "incentive.png"
    }),
    new DefaultCategory({
        name: "Rental",
        type: "Income",
        icon: "rental.png"
    }),
    new DefaultCategory({
        name: "Investment",
        type: "Income",
        icon: "investment.png"
    }),
];

var seeded = 0;

for (var i = 0; i < defaultCategories.length; i++) {
    defaultCategories[i].save((error, result) => {
        seeded++;
        if (seeded === defaultCategories.length) {
            console.log("Default categories seeded...");
            mongoose.disconnect();
        }
    });
}
