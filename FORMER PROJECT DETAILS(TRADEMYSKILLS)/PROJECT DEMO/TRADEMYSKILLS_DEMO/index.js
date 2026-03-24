const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.getHome);
router.get('/login', mainController.getLogin);
router.get('/register', mainController.getRegister);
router.get('/dashboard', mainController.getDashboard);
router.get('/skills/new', mainController.getPostSkill);
router.post('/skills/new', mainController.handlePostSkill);
router.get('/skills/:id', mainController.getSkillDetails);
router.get('/messages', mainController.getMessages);

module.exports = router;
