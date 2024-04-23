const express = require("express");
const router = express.Router();

const ticketDetailControllers = require("../controllers/ticket_details");

router.get("/", ticketDetailControllers.ticket_detail_get_all);
router.post("/", ticketDetailControllers.ticket_detail_post);

module.exports = router;
