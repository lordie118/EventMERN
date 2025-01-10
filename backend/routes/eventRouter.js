const express = require('express');
const eventController = require('../controllers/eventController');
const checkAdmin = require('../middlewear/checkadmin');
const authenticateToken = require('../middlewear/authenticateToken');

const router = express.Router();

router.post('/events',authenticateToken,checkAdmin,eventController.createEvent);

router.put('/events/:id',authenticateToken,checkAdmin, eventController.updateEvent);
router.delete('/events/:id',authenticateToken,checkAdmin, eventController.deleteEvent);

router.post('/events/:eventId/adduser', eventController.addUserToEvent);
router.get('/users/events', authenticateToken, eventController.getUserEvents);
router.get('/events',eventController.getAllEvents);
module.exports = router;
