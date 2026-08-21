const Social = require('../module/social.module');

function iconFor(platform = '') {
  const p = platform.toLowerCase();
  if (p.includes('github')) return 'fa-brands fa-github';
  if (p.includes('linkedin')) return 'fa-brands fa-linkedin-in';
  if (p.includes('instagram')) return 'fa-brands fa-instagram';
  if (p.includes('facebook')) return 'fa-brands fa-facebook';
  if (p.includes('youtube')) return 'fa-brands fa-youtube';
  if (p === 'x' || p.includes('twitter')) return 'fa-brands fa-x-twitter';
  if (p.includes('whatsapp')) return 'fa-brands fa-whatsapp';
  if (p.includes('telegram')) return 'fa-brands fa-telegram';
  if (p.includes('behance')) return 'fa-brands fa-behance';
  if (p.includes('dribbble')) return 'fa-brands fa-dribbble';
  return 'fa-solid fa-link';
}

const createSocial = async (req, res) => {
  try {
    const social = await Social.create({ ...req.body, icon: req.body.icon || iconFor(req.body.platform) });
    res.status(201).json(social);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getSocial = async (req, res) => {
  try {
    const socials = await Social.find();
    res.status(200).json(socials.map(s => ({ ...s.toObject(), icon: s.icon || iconFor(s.platform) })));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateSocial = async (req, res) => {
  try {
    const body = { ...req.body };
    if (!body.icon && body.platform) body.icon = iconFor(body.platform);
    const social = await Social.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!social) return res.status(404).json({ message: 'Social link not found' });
    res.status(200).json(social);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const setSocialVisibility = async (req, res) => {
  try {
    const social = await Social.findByIdAndUpdate(
      req.params.id,
      { visible: req.body.visible !== false },
      { new: true }
    );
    if (!social) return res.status(404).json({ message: 'Social link not found' });
    res.status(200).json(social);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteSocial = async (req, res) => {
  try {
    const social = await Social.findByIdAndDelete(req.params.id);
    if (!social) return res.status(404).json({ message: 'Social link not found' });
    res.status(200).json({ message: 'Social link deleted permanently', social });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { creatsSocial: createSocial, getSocial, updateSocial, setSocialVisibility, deletSocial: deleteSocial };
