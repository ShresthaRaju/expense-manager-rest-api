import express from 'express';
import './config/dbConnection';
import apiRouter from './routes/api';

var app = express();

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", apiRouter);

const PORT = 7777;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));