const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
//2bee7964e20463e687c23586eff7c137-us17
//0730f10faf
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(process.env.PORT||3000,function(){
    console.log("Server Started");
    console.log(__dirname);
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var email = req.body.email;
    var data = {
        members: [
            {
             email_address : email,
             status: "subscribed",
             merge_fields:{
                 NAAM:fname,
                 SURNAAM:lname
             }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    var options = {
        url: "https://us17.api.mailchimp.com/3.0/lists/0730f10faf",
        method:"POST",
        headers:{
            "Authorization":"Rachit 2bee7964e20463e687c23586eff7c137-us17"
        },
        body:jsonData
    };
    request(options, function(error,response,body){
        if(error){
            res.sendFile(__dirname+"/failure.html");
        }
        else{
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        }
    });
});
app.post("/failure",function(req,res){
res.redirect("/");
});