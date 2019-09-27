const router = require("express").Router();
const { Company } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await Company.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
