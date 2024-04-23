const express = require("express");
const router = express.Router();

const ticketDetailControllers = require("../controllers/ticket_details");

router.get("/", ticketDetailControllers.ticket_detail_get_all);
router.post("/", ticketDetailControllers.ticket_detail_post);
router.get("/:ticketDetailId", ticketDetailControllers.ticket_detail_get_one);
router.delete("/:ticketDetailId", ticketDetailControllers.ticket_detail_delete);
router.patch("/:ticketDetailId", ticketDetailControllers.ticket_detail_patch);

module.exports = router;
