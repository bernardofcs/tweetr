"use strict";

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const bcrypt        = require('bcrypt');
const usersRoutes  = express.Router();
const users = [];

module.exports = function(DataHelpers) {

  usersRoutes.get("/", (req, res) => {
    // if(req.session.user_id){
      res.render("index.ejs");
    // }else{
    //   res.redirect("/login");
    // }
  });

  usersRoutes.get("/login", function(req, res) {
    res.render("login.ejs")
  });

  usersRoutes.post("/login", (req, res) => {                   //user authentication
    // for(const user in users){
    //   if(users[user]['email'] === req.body.email){
    //     if(bcrypt.compareSync(req.body.password, users[user]['password'])){
    //       req.session.user_id = users[user]['id'];
    //       res.redirect('/');
    //       return;
    //     }else{
    //       res.status(401).send('Sorry, this is the wrong password for this email!<br><a href="/login">Go Back</a>').end();
    //       return;
    //     }
    //   }
    // }
    // res.status(400).send('Sorry, the email is not registered!<br><a href="/login">Go Back</a>').end();
    const user = { email: req.body.email, password: req.body.password }
    DataHelpers.getUser(user, (err, found, user_id) => {
      if(found){
        req.session.user_id = user_id;
        res.redirect('/');
        return;
      }else{
        res.status(401).send('Sorry, wrong login credentials!<br><a href="/login">Go Back</a>').end();
        return;
      }
    })
  });

  usersRoutes.post("/logout", (req, res) => {                      //user logs out
    req.session.user_id = null;
    res.redirect('/')
  });

  usersRoutes.get("/register", (req, res) =>{                       //request for registration page
    if(req.session.user_id){
      res.redirect('/');
      return;
    }
    res.render('register.ejs');
  });

  usersRoutes.post("/register", (req, res) =>{                        //registers a new user
    if(req.body.email === '' || req.body.password === ''){
      res.status(400).send('Sorry, email or password missing!<br><a href="/register">Go Back</a>').end();
        return;
    }
    // for(const user in users){
    //   if(users[user]['email'] === req.body.email){
    //     res.status(400).send('Sorry, the email is already registered!<br><a href="/register">Go Back</a>').end();
    //     return;
    //   }
    // }
    let randomId = generateRandomString();
    const password = req.body.password;
    const hashed_password = bcrypt.hashSync(password, 10);
    let user = {
      id: randomId,
      email: req.body.email,
      password: hashed_password
    };
    DataHelpers.saveUser(user, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
        req.session.user_id = randomId;
        res.redirect('/');
      }
    });

  });

  return usersRoutes;

}
function generateRandomString() {             //generates a random 6 digit string
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i=0; i < 6; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
