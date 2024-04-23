const express = require("express");
const router = express.Router();

const computerControllers = require("../controllers/computers");

router.get("/", computerControllers.computer_get_all);
router.post("/", computerControllers.computer_post);
router.get("/:computerId", computerControllers.computer_get_id);
router.patch("/:computerId", computerControllers.computer_patch);
router.delete("/:computerId", computerControllers.computer_delete);

module.exports = router;
