const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const userRouter = require("./routes/userRoutes");
const contactRouter = require("./routes/contractRoutes");
const mongoose = require("mongoose");


app.use(express.json());
app.use((req,res,next)=>{
    console.log("HTTP method - " + req.method + " , URL - " + req.url);
    next();
})
app.use("/users", userRouter);
app.use("/contract", contactRouter);



mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.vpesn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  
).then(()=>{
    
    console.log("MongoDB is connected");
    app.listen(5000, () => {
        console.log("Server started on this port 5000");
    });

}).catch((error)=>{
    console.log("DB error:",error);
})
