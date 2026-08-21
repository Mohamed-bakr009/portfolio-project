const Profile = require('../module/profile.module');

const DEFAULTS = {
  show: {
    name: true, title: true, bio: true, location: true,
    email: true, phone: true, image: true
  },
  portfolioVisible: true,
  available: true,
  availabilityTitle: 'Open to opportunities',
  availabilityNote: 'Available now — internship or freelance work.'
};

const normalize = (profile) => {
  if (!profile) return null;
  const p = profile.toObject ? profile.toObject() : profile;
  return {
    ...p,
    show: { ...DEFAULTS.show, ...(p.show || {}) },
    portfolioVisible: p.portfolioVisible !== false,
    available: p.available !== false,
    availabilityTitle: p.availabilityTitle || DEFAULTS.availabilityTitle,
    availabilityNote: p.availabilityNote || DEFAULTS.availabilityNote
  };
};

const creatProfile = async (req, res) => {
  try {
    const exists = await Profile.findOne();
    if (exists) return res.status(409).json({ message: 'Profile already exists' });
    const profile = await Profile.create({ ...req.body, ...(!req.body.show ? { show: DEFAULTS.show } : {}) });
    res.status(201).json(normalize(profile));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getprofile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(normalize(profile));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateprofile = async (req, res) => {
  try {
    const current = await Profile.findOne();
    if (!current) return res.status(404).json({ message: 'Profile not found' });

    const body = { ...req.body };
    if (body.show) body.show = { ...DEFAULTS.show, ...current.show?.toObject?.(), ...body.show };

    const profile = await Profile.findByIdAndUpdate(current._id, body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(normalize(profile));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    profile.available = !profile.available;
    await profile.save();
    res.status(200).json(normalize(profile));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setPortfolioVisibility = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    profile.portfolioVisible = req.body.visible !== false;
    await profile.save();
    res.status(200).json(normalize(profile));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteprofile = async (req, res) => {
  // Kept as a compatibility endpoint: it toggles availability.
  return toggleAvailability(req, res);
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file uploaded' });

    const profile = await Profile.findOneAndUpdate(
      {},
      { image: `/uploads/${req.file.filename}`, 'show.image': true },
      { new: true }
    );

    if (!profile) return res.status(404).json({ message: 'Profile not found, create it first' });
    res.status(200).json(normalize(profile));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  creatProfile,
  getprofile,
  updateprofile,
  deleteprofile,
  toggleAvailability,
  setPortfolioVisibility,
  uploadProfileImage,
};
