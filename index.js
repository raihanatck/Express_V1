const express = require("express");
const app = express();
// const quotes = require("./quotes.json");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");

app.use(express.json());
app.use("/users", userRouter);
app.use("/note", noteRouter);

// app.get("/", (req, res) => {
//   res.send("Hii");
// });

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.vpesn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    
    app.listen(5000, () => {
        console.log("Server started on this port 5000");
    });

}).catch((error)=>{
    console.log("DB error:",error);
})
