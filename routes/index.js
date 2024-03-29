const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
// WELCOME
router.get("/", (req, res) => res.render("welcome"));
// DASHBOARD
router.get("/dashboard", ensureAuthenticated, (req, res) =>
    res.render("dashboard", {
        name: req.user.name
    })
);
module.exports = router;
