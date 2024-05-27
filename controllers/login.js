const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signupModel = require('../model/signupmodel');
const loginModel = require('../model/loginmodel'); // loginModel import karein

module.exports = {
    login: async (req, res) => {
        try {
            console.log("Request body:", req.body);
            const { email, password } = req.body;
            // Check if user exists
            const user = await signupModel.findOne({ Email: email });
            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid email or password"
                });
            }
            // Password verify karein
            const isPasswordValid = await bcrypt.compare(password, user.Password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid email or password"
                });
            }
            // JWT generate karein
            const token = jwt.sign(
                { userId: user._id, email: user.Email },
                'your_jwt_secret', // Replace with your actual secret key
                { expiresIn: '1h' } // Token expiry time
            );

            // Login data ko store karein
            const loginData = {
                Email: email,
                Password: user.Password, // Storing the hashed password
                token: token // Store the generated token
            };
            await loginModel.create(loginData);

            // JWT token ko cookie mein set karein aur dashboard par redirect karein
            res.cookie('token', token, { httpOnly: true });
            return res.redirect('/dashboard');
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({
                status: "error",
                message: "Internal server error",
                data: "No data found"
            });
        }
    }
};
