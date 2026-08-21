const express = require('express');
const skillsRouter = express.Router();
const skillsController = require('../controlers/skils.control');

skillsRouter.post('/create', skillsController.createSkill);
skillsRouter.get('/', skillsController.getAllSkill);
skillsRouter.get('/:id', skillsController.getSkillById);
skillsRouter.patch('/update/:id', skillsController.updateSkill);
skillsRouter.put('/update/:id', skillsController.updateSkill);
skillsRouter.patch('/visibility/:id', skillsController.setSkillVisibility);
skillsRouter.patch('/tech/:id', skillsController.setTechStripSkill);
skillsRouter.delete('/:id', skillsController.deleteSkill);
skillsRouter.patch('/delete/:id', skillsController.deleteSkill);

module.exports = skillsRouter;
