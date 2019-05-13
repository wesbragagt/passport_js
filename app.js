const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
// sequelize db
const db = require("./models");

const app = express();

// passport config
require("./config/passport")(passport);

const PORT = process.env.PORT || 5000;
// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// body parser
app.use(express.urlencoded({ extended: false }));

// express-session middleware
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// Routes

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

// connect to mysql
db.User.sync({ force: false }).then(() => {
    db.User.create({
        name: "wes",
        email: "wes@wes.com",
        password: "123456"
    });
});

app.listen(PORT, console.log(`Server starting on ${PORT}`));
