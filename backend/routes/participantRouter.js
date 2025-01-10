const express = require('express');
const partcipantController = require('../controllers/partcipantController');

const router = express.Router();

router.post('/signup', partcipantController.signup);
router.post('/login', partcipantController.login);
router.post('/logout', partcipantController.logout);

module.exports = router;