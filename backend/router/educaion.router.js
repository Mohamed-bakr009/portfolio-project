const express = require('express');
const educationRouter = express.Router();
const educationController = require('../controlers/educaion.control');

educationRouter.post('/create', educationController.createEducation);
educationRouter.get('/', educationController.getAllEducation);
educationRouter.get('/:id', educationController.getEducationById);
educationRouter.patch('/update/:id', educationController.updateEducation);
educationRouter.patch('/visibility/:id', educationController.setEducationVisibility);
educationRouter.delete('/:id', educationController.deleteEducation);
educationRouter.patch('/delete/:id', educationController.deleteEducation);

module.exports = educationRouter;
