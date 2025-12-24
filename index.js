require('dotenv').config();
let PORT= process.env.PORT || 3000;

let express= require('express');
let app= express();
app.use(express.json());
let bodyParser = require('body-parser');
app.use(bodyParser.json());

let dBconnect = require('./config/database');
dBconnect();

// importing routes
let blogRoutes= require('./routes/blog_routes');

// using routes
app.use('/api/v1/blog', blogRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})



app.get('/', (req,res)=>{
    res.send('Welcome to the Blog App API');
})