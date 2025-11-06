let express= require('express');
require('dotenv').config();

let app= express();
let PORT= process.env.PORT || 3000;



app.use(express.json());

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