const Cv = require('../module/cv.module');
const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');
const { parseCvText } = require('../utils/cvParser');

const uploadsDir = path.join(__dirname, '..', 'uplodes');

const safeRemoveFile = (filePath) => {
  if (!filePath) return;
  const absolute = path.join(uploadsDir, path.basename(filePath));
  try { if (fs.existsSync(absolute)) fs.unlinkSync(absolute); } catch (_) { }
};

const creatCv = async (req, res) => {
  try {
    const old = await Cv.findOne();
    if (old) {
      safeRemoveFile(old.filePath);
      await Cv.deleteOne({ _id: old._id });
    }
    const cv = await Cv.create({ ...req.body, visible: req.body.visible !== false, deleted: false });
    res.status(201).json(cv);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getCv = async (req, res) => {
  try {
    const cv = await Cv.find();
    res.status(200).json(cv);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateCv = async (req, res) => {
  try {
    const cv = await Cv.findOneAndUpdate({}, { ...req.body, deleted: false }, { new: true, runValidators: true });
    if (!cv) return res.status(404).json({ message: 'CV not found' });
    res.status(200).json(cv);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteCv = async (req, res) => {
  try {
    const cv = await Cv.findOne();
    if (!cv) return res.status(404).json({ message: 'CV not found' });
    safeRemoveFile(cv.filePath);
    await Cv.deleteOne({ _id: cv._id });
    res.status(200).json({ message: 'CV deleted permanently' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const hideCv = async (req, res) => {
  try {
    const cv = await Cv.findOneAndUpdate({}, { visible: false }, { new: true });
    if (!cv) return res.status(404).json({ message: 'CV not found' });
    res.status(200).json(cv);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const showCv = async (req, res) => {
  try {
    const cv = await Cv.findOneAndUpdate({}, { visible: true, deleted: false }, { new: true });
    if (!cv) return res.status(404).json({ message: 'CV not found' });
    res.status(200).json(cv);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const uploadCv = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No PDF file uploaded' });

    const fileName = req.file.originalname;
    const filePath = `/uploads/${req.file.filename}`;
    const absolutePath = path.join(uploadsDir, req.file.filename);

    let parsedData = undefined;
    try {
      const dataBuffer = fs.readFileSync(absolutePath);
      const parser = new PDFParse({ data: dataBuffer });
      const result = await parser.getText();
      parsedData = parseCvText(result.text);
    } catch (parseError) {
      console.log('CV parsing failed:', parseError.message);
    }

    const old = await Cv.findOne();
    if (old) {
      safeRemoveFile(old.filePath);
      await Cv.deleteOne({ _id: old._id });
    }

    const cv = await Cv.create({ fileName, filePath, parsedData, visible: true, deleted: false });
    res.status(201).json(cv);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const reparseCv = async (req, res) => {
  try {
    const cv = await Cv.findOne();
    if (!cv) return res.status(404).json({ message: 'CV not found' });

    const absolutePath = path.join(uploadsDir, path.basename(cv.filePath));
    if (!fs.existsSync(absolutePath)) return res.status(404).json({ message: 'CV PDF file not found' });

    const dataBuffer = fs.readFileSync(absolutePath);
    const parser = new PDFParse({ data: dataBuffer });
    const result = await parser.getText();
    cv.parsedData = parseCvText(result.text);
    await cv.save();
    res.status(200).json(cv);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { creatCv, getCv, updateCv, deleteCv, hideCv, showCv, uploadCv, reparseCv };
