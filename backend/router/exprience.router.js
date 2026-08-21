const express = require('express');
const experienceRouter = express.Router();
const experienceController = require('../controlers/exprerience.control');

experienceRouter.post('/create', experienceController.createExperience);
experienceRouter.get('/', experienceController.getAllExperience);
experienceRouter.get('/:id', experienceController.getExperienceById);
experienceRouter.patch('/update/:id', experienceController.updateExperience);
experienceRouter.patch('/visibility/:id', experienceController.setExperienceVisibility);
experienceRouter.delete('/:id', experienceController.deleteExperience);
experienceRouter.patch('/delete/:id', experienceController.deleteExperience);

module.exports = experienceRouter;
