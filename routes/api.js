import express from 'express';

const APIROUTER=express.Router();

APIROUTER.get('/',(req,res)=>res.send("Working, ain't it?"));

export default APIROUTER;