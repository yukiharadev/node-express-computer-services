const express = require("express");
const router = express.Router();

const staffUserControllers = require("../controllers/staff_user");

router.post("/signup", staffUserControllers.staff_user_signup);
router.post("/login", staffUserControllers.staff_login);
router.delete("/:staffId", staffUserControllers.staff_user_delete);
module.exports = router;
