const express = require("express");
let { config } = require("./config");
let expressSession = require("express-session");
const app = express();
const PORT = 3057;
let path = require("path");
let passport = require("passport");
let FacebookStrategy = require("passport-facebook").Strategy;
let usuarios = [];
//const FACEBOOK_KEY = "771246753847725";
//const FACEBOOK_SECRET_KEY = "770d89b8b12a83e413d3072b66e81ef1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "views", "ejs"));
app.set("view engine", "ejs");

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook_key,
      consumerSecret: config.facebook_secret_key,
      callbackURL: "/auth/facebook/callback",
    },
    (token, tokenSecret, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(
  expressSession({
    secret: "secret123",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

let isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

let isNotAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/datos");
  }
};

app.get("/info", (req, res, next) => {
  res.render("info");
});

app.get("/registro", isNotAuth, (req, res, next) => {
  res.render("registro");
});

app.post(
  "/registro",
  passport.authenticate("register", {
    failureRedirect: "registro-error",
    successRedirect: "datos",
  })
);

app.get("/", (req, res, next) => {
  res.redirect("login");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "registro",
    successRedirect: "datos",
  })
);

app.get("/datos", isAuth, (req, res, next) => {
  if (!req.user.contador) {
    req.user.contador = 1;
  } else {
    req.user.contador++;
  }
  console.log("-------------------------------------");
  console.log(req.user);
  res.render("datos", {
    contador: req.user.contador,
    usuario: req.user,
  });
});

app.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) res.send(JSON.stringify(err));
    res.redirect("login");
  });
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/registro",
    successRedirect: "/datos",
  })
);

app.listen(PORT, (err) => {
  if (err) return console.log("error en listen server", err);
  console.log(`Server running on PORT ${config.port}`);
});
