const Skills = require('../module/skils.module');

const createSkill = async (req, res) => {
  try {
    const skill = await Skills.create({
      ...req.body,
      visible: req.body.visible !== false,
      showInTechStrip: req.body.showInTechStrip === true
    });
    res.status(201).json(skill);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getAllSkill = async (req, res) => {
  try { res.status(200).json(await Skills.find()); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

const getSkillById = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(200).json(skill);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(200).json(skill);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const setSkillVisibility = async (req, res) => {
  try {
    const skill = await Skills.findByIdAndUpdate(
      req.params.id,
      { visible: req.body.visible !== false },
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(200).json(skill);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const setTechStripSkill = async (req, res) => {
  try {
    const skill = await Skills.findByIdAndUpdate(
      req.params.id,
      { showInTechStrip: req.body.showInTechStrip === true },
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(200).json(skill);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skills.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.status(200).json({ message: 'Skill deleted permanently', skill });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { createSkill, getAllSkill, getSkillById, updateSkill, setSkillVisibility, deleteSkill, setTechStripSkill };
