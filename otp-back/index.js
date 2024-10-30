const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ListRouter = require("./Routes/ListRouter")
const app = express();
const port = 4000;
app.use(bodyParser.json());
const mongoURI = "mongodb+srv://userDetails:Dk3536@todo-vmya9.mongodb.net/test?retryWrites=true&w=majority";
//mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}); 
mongoose.connect("mongodb://localhost:27017/users",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}); 
app.use("/",ListRouter);
    
app.listen(4000);