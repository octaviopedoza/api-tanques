const mongoose = require('mongoose')

const dbConect  = async() => {
    const DB_URI = process.env.DB_URI;
    
    try {
        await mongoose.connect(DB_URI);
        console.log("conectado a DB");
    } catch (error) {
        console.log(error);
        throw new Error("No se a podido realizar la conecxión a la DB");
    }
}

module.exports = { dbConect };