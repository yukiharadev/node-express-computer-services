const express = require("express");
const router = express.Router();

const invoiceController = require("../controllers/invoice");

router.get("/", invoiceController.invoice_get_all);
router.post("/", invoiceController.invoice_post);
router.get("/:invoiceId", invoiceController.invoice_get_id);
router.get(
  "/customer/:customerId",
  invoiceController.get_invoices_by_customerId
);

module.exports = router;
