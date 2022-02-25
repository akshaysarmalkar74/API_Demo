const User = require("../Models/user");
const mongoose = require("mongoose");
const casual = require("casual");

mongoose.connect('mongodb://localhost:27017/api-demo');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await User.deleteMany({});
    for (let i = 0; i < 20; i++) {
        let random = Math.random()
        let gender = random > 0.5 ? "Male" : "Female"
        const user = new User({
            name: casual.full_name,
            email: casual.email,
            age: casual.integer(from = 0, to = 100),
            gender: gender
        })
        
        // Save to Database
        await user.save()
    }
    
    console.log("20 Users Added")
}

seedDB().then(() => {
    mongoose.connection.close();
})