const express = require("express");
const router = express.Router();

const computerControllers = require("../controllers/computers");
const checkAuth = require("../../middlewares/check-auth");

router.get("/", checkAuth, computerControllers.computer_get_all);
router.post("/", checkAuth, computerControllers.computer_post);
router.get("/:computerId", checkAuth, computerControllers.computer_get_id);
router.patch("/:computerId", checkAuth, computerControllers.computer_patch);
router.delete("/:computerId", checkAuth, computerControllers.computer_delete);

module.exports = router;
