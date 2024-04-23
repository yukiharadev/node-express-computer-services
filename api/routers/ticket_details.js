const express = require("express");
const router = express.Router();

const ticketDetailControllers = require("../controllers/ticket_details");
const checkAuth = require("../../middlewares/check-auth");

router.get("/", ticketDetailControllers.ticket_detail_get_all);
router.post("/", checkAuth, ticketDetailControllers.ticket_detail_post);
router.get("/:ticketDetailId", ticketDetailControllers.ticket_detail_get_one);
router.delete(
  "/:ticketDetailId",
  checkAuth,
  ticketDetailControllers.ticket_detail_delete
);
router.patch(
  "/:ticketDetailId",
  checkAuth,
  ticketDetailControllers.ticket_detail_patch
);

module.exports = router;
