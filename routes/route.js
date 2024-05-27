const express=require('express');
const router=express.Router();
const signupController=require('../controllers/signup');
const loginController=require('../controllers/login');
router.post('/signup',signupController.signup);
router.post('/login',loginController.login);
router.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Ensure you have a dashboard.ejs file in your views folder
});

module.exports=router;