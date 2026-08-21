const Education = require('../module/education.module');

const createEducation = async (req, res) => {
  try {
    res.status(201).json(await Education.create(req.body));
  }
  catch (error) 
  { res.status(500).json({ message: error.message }); }
};
const getAllEducation = async (req, res) => {
  try { res.status(200).json(await Education.find()); }
  catch (error) { res.status(500).json({ message: error.message }); }
};
const getEducationById = async (req, res) => {
  try {
    const item = await Education.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Education not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateEducation = async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Education not found' });
    res.status(200).json(item);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
const setEducationVisibility = async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, { visible: req.body.visible !== false }, { new: true });
    if (!item) return res.status(404).json({ message: 'Education not found' });
    res.status(200).json(item);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
const deleteEducation = async (req, res) => {
  try {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Education not found' });
    res.status(200).json({ message: 'Education deleted permanently', education: item });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
module.exports = { createEducation, getAllEducation, getEducationById, updateEducation, setEducationVisibility, deleteEducation };
