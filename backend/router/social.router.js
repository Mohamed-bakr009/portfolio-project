const express = require('express');
const router = express.Router();
const socialController = require('../controlers/social.control');

router.post('/create', socialController.creatsSocial);
router.get('/', socialController.getSocial);
router.patch('/update/:id', socialController.updateSocial);
router.put('/update/:id', socialController.updateSocial);
router.patch('/visibility/:id', socialController.setSocialVisibility);
router.delete('/delete/:id', socialController.deletSocial);
router.patch('/delet/:id', socialController.deletSocial); // backward compatibility

module.exports = router;
