const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const materialRouter = require('./router/material.js')

const mongodbURI = require('./config/keys').mongodbURI;
mongoose.connect(mongodbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=> console.log('数据库连接成功'))
        .catch(()=> console.log('数据库连接失败'))
mongoose.set('useFindAndModify', false)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/materialApi/material', materialRouter);

app.listen(3002, () => {console.log('服务器开启成功')});

let date = new Date();
let time = date.getFullYear().toString()+"-"+ (date.getMonth() + 1).toString()+"-"+ date.getDate().toString();
console.log(time)

