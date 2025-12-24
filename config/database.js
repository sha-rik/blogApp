let mongoose= require('mongoose');

require('dotenv').config();

let connect_to_db = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log('Database connected successfully');
    })
    .catch((err)=>{
        console.log('Database connection error:', err);
        process.exit(1);
    });
}

module.exports = connect_to_db;