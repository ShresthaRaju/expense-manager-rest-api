
import mongoose from 'mongoose';
import Category from '../models/Category';

mongoose.connect("mongodb://127.0.0.1:27017/expense_manager", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

let defaultCategories = [
    new Category({
        name: "Food",
        type: "Expense",
        icon: "food.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Transportation",
        type: "Expense",
        icon: "transportation.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Entertainment",
        type: "Expense",
        icon: "entertainment.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Travel",
        type: "Expense",
        icon: "travel.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Education",
        type: "Expense",
        icon: "education.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Bills",
        type: "Expense",
        icon: "bills.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Mobile",
        type: "Expense",
        icon: "mobile.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Cigarette",
        type: "Expense",
        icon: "cigarette.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Shopping",
        type: "Expense",
        icon: "shopping.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Beauty",
        type: "Expense",
        icon: "beauty.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Gadgets",
        type: "Expense",
        icon: "gadgets.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Others",
        type: "Expense",
        icon: "others.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Salary",
        type: "Income",
        icon: "salary.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Incentive",
        type: "Income",
        icon: "incentive.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Rental",
        type: "Income",
        icon: "rental.png",
        addedBy: "admin"
    }),
    new Category({
        name: "Investment",
        type: "Income",
        icon: "investment.png",
        addedBy: "admin"
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
