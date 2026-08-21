const express = require('express');
const projectRouter = express.Router();
const projectController = require('../controlers/project.control');
const { uploadImage } = require('../upload');

projectRouter.post('/create', projectController.createProject);
projectRouter.get('/', projectController.getProject);
projectRouter.get('/:id', projectController.getProjectById);
projectRouter.patch('/update/:id', projectController.updateProject);
projectRouter.patch('/visibility/:id', projectController.setProjectVisibility);
projectRouter.patch('/visibility-all', projectController.setAllProjectsVisibility);
projectRouter.delete('/:id', projectController.deleteProject);
projectRouter.patch('/delete/:id', projectController.deleteProject);
projectRouter.post('/upload-image/:id', uploadImage.single('image'), projectController.uploadProjectImage);

module.exports = projectRouter;
