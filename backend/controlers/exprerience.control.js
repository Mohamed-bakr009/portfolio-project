const Experience = require('../module/experience.module');

const createExperience = async (req, res) => {
  try {
    res.status(201).json(await Experience.create(req.body));
  }
  catch (error) { res.status(500).json({ message: error.message }); }
};
const getAllExperience = async (req, res) => {
  try {
    res.status(200).json(await Experience.find());
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getExperienceById = async (req, res) => {
  try {
    const item = await Experience.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Experience not found' });
    res.status(200).json(item);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
const updateExperience = async (req, res) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Experience not found' });
    res.status(200).json(item);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
const setExperienceVisibility = async (req, res) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, { visible: req.body.visible !== false }, { new: true });
    if (!item) return res.status(404).json({ message: 'Experience not found' });
    res.status(200).json(item);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
const deleteExperience = async (req, res) => {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Experience not found' });
    res.status(200).json({ message: 'Experience deleted permanently', experience: item });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
module.exports = { createExperience, getAllExperience, getExperienceById, updateExperience, setExperienceVisibility, deleteExperience };
