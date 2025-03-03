const { bgCyan } = require('colors')
const mongoose = require('mongoose')

const conn = async()=>{
    try {
        await mongoose.connect(`${process.env.URI}`)
        console.log(`Connect to database` .bgCyan)
    } catch (error) {
        console.log(error)
        
    }
}

conn()