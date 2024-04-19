const express = require('express');
const router = express.Router();
const multer = require('multer');

const serviceController = require("../controllers/services");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
      },
})

const upload = multer({
    storage :storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
})

router.get('/', serviceController.services_get_all);
router.post('/',upload.single("serviceUrl"), serviceController.services_post)

module.exports = router;