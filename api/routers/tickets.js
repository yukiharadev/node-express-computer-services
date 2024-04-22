const express = require("express");
const router = express.Router();

const ticketControllers = require("../controllers/tickets");

router.get("/", ticketControllers.ticket_get_all);
router.post("/", ticketControllers.ticket_post);
router.get("/:ticketId", ticketControllers.ticket_get_id);
router.patch("/:ticketId", ticketControllers.ticket_patch);
router.delete("/:ticketId", ticketControllers.ticket_delete);

module.exports = router;
