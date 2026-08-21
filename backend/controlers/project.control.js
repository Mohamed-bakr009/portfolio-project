const Project = require('../module/project.module');

const createProject = async (req, res) => {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

const getProject = async (req, res) => {
  try { res.status(200).json(await Project.find()); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted permanently', project });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const setProjectVisibility = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { visible: req.body.visible !== false },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const setAllProjectsVisibility = async (req, res) => {
  try {
    const visible = req.body.visible !== false;
    const result = await Project.updateMany({}, { visible });
    res.status(200).json({ message: `All projects ${visible ? 'shown' : 'hidden'}`, ...result });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file uploaded' });
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { image: `/uploads/${req.file.filename}` },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = {
  createProject, getProject, getProjectById, updateProject,
  deleteProject, setProjectVisibility, setAllProjectsVisibility,
  uploadProjectImage
};
