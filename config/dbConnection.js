import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/expense_manager", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("Database connected successfully..."))
    .catch((error) => console.log(error));