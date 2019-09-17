
import mongoose from 'mongoose';
import Category from '../models/Category';

mongoose.connect("mongodb://127.0.0.1:27017/expense_manager", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

let categories = [
    new Category({
        name: "Food",
        type: "Expense",
        icon: "food.png"
    }),
    new Category({
        name: "Transportation",
        type: "Expense",
        icon: "transportation.png"
    }),
    new Category({
        name: "Entertainment",
        type: "Expense",
        icon: "entertainment.png"
    }),
    new Category({
        name: "Travel",
        type: "Expense",
        icon: "travel.png"
    }),
    new Category({
        name: "Education",
        type: "Expense",
        icon: "education.png"
    }),
    new Category({
        name: "Bills",
        type: "Expense",
        icon: "bills.png"
    }),
    new Category({
        name: "Mobile",
        type: "Expense",
        icon: "mobile.png"
    }),
    new Category({
        name: "Cigarette",
        type: "Expense",
        icon: "cigarette.png"
    }),
    new Category({
        name: "Shopping",
        type: "Expense",
        icon: "shopping.png"
    }),
    new Category({
        name: "Beauty",
        type: "Expense",
        icon: "beauty.png"
    }),
    new Category({
        name: "Gadgets",
        type: "Expense",
        icon: "gadget.png"
    }),
    new Category({
        name: "Others",
        type: "Expense",
        icon: "others.png"
    }),
];

var seeded = 0;

for (var i = 0; i < categories.length; i++) {
    categories[i].save((error, result) => {
        seeded++;
        if (seeded === categories.length) {
            console.log("Categories seeded...");
            mongoose.disconnect();
        }
    });
}
