const express=require('express');
const connectDB=require('./database/database');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const route=require('./routes/route');
const path= require('path');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
port=4000;
app.use('/',route);
app.get('/',(req,res)=>{
    res.render('signup', { message: null });
    });  
    app.get('/login', (req, res) => {
        res.render('login', { message: null });
    });
    app.get('/dashboard', (req, res) => {
        res.render('dashboard');
    });
try {
    app.listen(port, async (req,res) => {
        try {
            await connectDB();
            console.log("Server is running on port and database is connected", port);
        } catch (error) {
            console.log("Error connecting to the database:", error);
        }
    });
} catch (error) {
    console.log("Error starting the server:", error);
}
