const mongoose = require('mongoose')

const connectDB = async () =>{
    return mongoose
    .connect("mongodb+srv://pamithapankaja:pamitha7890@cluster0.1tmigvh.mongodb.net/HashBazz")
    .then(() => console.log(`connection to ddatabse established`))
    .catch((err) => console.log(err))
};

module.exports = connectDB
