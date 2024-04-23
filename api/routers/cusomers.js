const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customers");
const checkAuth = require("../../middlewares/check-auth");

router.get("/", checkAuth, customerController.customer_get_all);
router.post("/", customerController.customer_post);
router.get("/:customerId", checkAuth, customerController.customer_get_id);
router.patch("/:customerId", checkAuth, customerController.customer_update);
router.delete("/:customerId", checkAuth, customerController.customer_delete);

module.exports = router;
