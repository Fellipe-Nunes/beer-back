const mongoose = require('mongoose')
const config = require('config')
//const db = config.get('mongoURI') || process.env.mongoURI

const connectDB = async (db=process.env.mongoURI || config.get('mongoURI')) => {
    try {

        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log('MongoDB conectado')
    } catch (err) {
        console.log(err.message)

        process.exit(1)
    }
}

module.exports = connectDB