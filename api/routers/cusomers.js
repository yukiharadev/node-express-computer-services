const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customers")

router.get("/", customerController.customer_get_all);

router.post("/", customerController.customer_post);

router.get("/:customerId", customerController.customer_get_id);

router.patch("/:customerId", customerController.customer_update);

router.delete("/:customerId", customerController.customer_delete);

module.exports = router;
