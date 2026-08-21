const express = require('express');
const cvRouter = express.Router();
const cvController = require('../controlers/cv.control');
const { uploadPdf } = require('../upload');

cvRouter.post('/create', cvController.creatCv);
cvRouter.post('/upload', uploadPdf.single('cv'), cvController.uploadCv);
cvRouter.post('/reparse', cvController.reparseCv);
cvRouter.get('/', cvController.getCv);
cvRouter.put('/update', cvController.updateCv);
cvRouter.put('/hide', cvController.hideCv);
cvRouter.put('/show', cvController.showCv);
cvRouter.put('/delete', cvController.deleteCv);

module.exports = cvRouter;
