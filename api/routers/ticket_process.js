const express = require("express");
const router = express.Router();

const ticketProcessController = require("../controllers/ticket_process");
const checkAuth = require("../../middlewares/check-auth");

router.get("/", ticketProcessController.ticket_process_get_all);
router.post("/", checkAuth, ticketProcessController.ticket_process_post);
router.get("/:ticketProcessId", ticketProcessController.ticket_process_get_id);
router.patch(
  "/:ticketProcessId",
  checkAuth,
  ticketProcessController.ticket_process_patch
);
router.delete(
  "/:ticketProcessId",
  checkAuth,
  ticketProcessController.ticket_process_delete
);

module.exports = router;
