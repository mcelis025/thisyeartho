//this file is our html routes, which tells the browser which html files to display
//depending on the address

//var db = require("../models");
var path = require("path");

module.exports = function(app, passport) {

  app.get("/signup", function(req, res) {
    res.sendFile("signup.html", { root: "public" });
  });

  //this sends the signin page
  app.get("/signin", function(req, res) {
    res.sendFile("signin.html", { root: "public" });
  });

  //this determines whether or not a user can signup with their email address or if it's already taken
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/",
    })
  );

  //this checks to see if the user is logged in and if so, sends them to the dashboard
  //otherwise they are sent to the signin page
  app.get("/dashboard", isLoggedIn, function(req, res) {
    res.sendFile("dashboard.html", { root: "public" });
  });

  //this allows the user to logout - there is no button for this yet, but
  //at some point there will be a button that can be clicked to run this
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  //this is a function that checks to see if the user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
    
    return next();

    res.redirect("/");
  }

  function isAdmin(req, res, next) {
    if (!req.user || !req.user.userAdmin) {
      next(new Error("Permission denied."));
      return;
    }

    next();

  }


  

  //this checks that the signin was done correctly
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "/",
    })
  );

///////////////// admin and add ///////////////////
  //once logged in as admin user -- admin.html
  app.get("/admin", isAdmin, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  });

  //once logged in as normal user -- add.html
  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });
};
