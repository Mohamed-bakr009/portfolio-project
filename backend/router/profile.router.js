const express = require('express');
const profileControls = require('../controlers/profile.control');
const router = express.Router();
const { uploadImage } = require('../upload');

router.post('/create', profileControls.creatProfile);
router.post('/upload-image', uploadImage.single('image'), profileControls.uploadProfileImage);
router.get('/', profileControls.getprofile);
router.patch('/update', profileControls.updateprofile);
router.patch('/availability', profileControls.toggleAvailability);
router.patch('/portfolio', profileControls.setPortfolioVisibility);
router.patch('/delete', profileControls.deleteprofile);

module.exports = router;
