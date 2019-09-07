import express from 'express';
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.end("Welcome to your new app");
})

const PORT = 7777;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));