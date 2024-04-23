const express = require("express");
const router = express.Router();
const multer = require("multer");

const serviceController = require("../controllers/services");
const checkAuth = require("../../middlewares/check-auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get("/", checkAuth, serviceController.services_get_all);
router.post(
  "/",
  checkAuth,
  upload.single("serviceUrl"),
  serviceController.services_post
);
router.get("/:servicesId", serviceController.services_get_id);
router.patch("/:servicesId", checkAuth, serviceController.services_update);

module.exports = router;
