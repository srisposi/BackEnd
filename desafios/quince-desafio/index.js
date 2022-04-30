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

//Cluster

const numCPUs = os.cpus().length;

const argv = yargs(hideBin(process.argv))
  .default({
    modo: "FORK",
    puerto: 8080,
  })
  .alias({
    m: "modo",
    p: "puerto",
  }).argv;

if (argv.modo.toUpperCase() == "CLUSTER") {
  if (cluster.isPrimary) {
    console.log(`Master Cluster PID ${process.pid} is running.`);

    // setup sticky sessions
    setupMaster(httpsServer, {
      loadBalancingMethod: "least-connection",
    });

    // setup connections between the workers
    setupPrimary();

    // FORK WORKER
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died.`);
      cluster.fork();
    });
  } else {
    //let io = serverSocketsEvents(httpsServer);

    const server = httpsServer.listen(PORT, (err) => {
      if (err) {
        console.log("Error while starting server");
      } else {
        console.log(
          `
                    Server running on PORT ${config.port}
                    `
        );
      }
    });

    // use the cluster adapter
    io.adapter(createAdapter());

    // setup connection with the primary process
    setupWorker(io);

    server.on("error", (error) =>
      console.log(`Error en servidorProcess Pid: ${process.pid}: ${error}`)
    );
  }
} else {
  serverSocketsEvents(httpsServer);

  const server = httpsServer.listen(PORT, "localhost", (err) => {
    if (err) {
      console.log("Error while starting server");
    } else {
      console.log(
        `Server running on PORT ${config.port}
                `
      );
    }
  });

  server.on("error", (error) => console.log(`Error en servidor ${error}`));
}

app.listen(PORT, (err) => {
  if (err) return console.log("error en listen server", err);
  console.log(`Server running on PORT ${config.port}`);
});
