const express = require('express');
const app = express();
const config = require("./configs/config.js");

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.json({
    limit: '50mb',
}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.static(path.join(__dirname,'./node_modules')));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
});
fs.readdir('./routers', (err, files) =>{
    files.forEach(file =>{
        try {
            let router = require("./routers/" + String(file));
            app.use(router);
            console.log("[Router] Load success : " + file);
        }
        catch(e) {
            console.log("[Router] Error reading : " + file + `\n${e}`);
        }
    });
    
});

app.listen(config.app.port, () =>{
    console.log("[API] Listening on port " + config.app.port);
});



