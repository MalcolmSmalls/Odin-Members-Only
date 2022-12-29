const express = require('express')
const router = express.Router()



router.get("/", (req, res, next) => {
    res.render("log-in-form", { title: "Log-In" });
  });


module.exports = router;