const User = require("./Models/user");
const mongoose = require("mongoose");
const express = require("express");
const app = express()
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/api-demo');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Use Body Parser & Method Override
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes

app.get("/", (req, res) => {
    res.send("HOME Route")
})

app.get("/view", async (req, res) => {
    const {id} = req.query;
    if (id) {
        // Return Specific User
        const user = await User.findById(id);
        res.send(user).status(200)
    } else {
        // Return All User
        const allUsers = await User.find()
        res.send(allUsers).status(200)
    }
})

// Create New User

app.post("/post", async (req, res) => {
    // Create a New User
    console.log(req.body)
    const newUser = await User.create(req.body);
    res.send({status: "User Added Successfully"}).status(200)
})

// Edit User
app.patch("/user/:id", async(req, res) => {
    const {id} = req.params
    const user = await User.findByIdAndUpdate(id, req.body);
    res.send({status: "User Updated"}).status(200)
})

app.listen(3000, () => {
    console.log("Server Running")
})
