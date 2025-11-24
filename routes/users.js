const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

router.patch("/me", auth, async (req, res) => {
  const updates = req.body;
  Object.assign(req.user, updates);
  await req.user.save();
  res.json(req.user);
});

module.exports = router;
