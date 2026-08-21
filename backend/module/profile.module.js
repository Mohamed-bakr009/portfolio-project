const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  location: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  image: { type: String, default: '' },

  show: {
    name: { type: Boolean, default: true },
    title: { type: Boolean, default: true },
    bio: { type: Boolean, default: true },
    location: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    phone: { type: Boolean, default: true },
    image: { type: Boolean, default: true }
  },

  available: { type: Boolean, default: true },
  availabilityTitle: { type: String, default: 'Open to opportunities' },
  availabilityNote: { type: String, default: 'Available now — internship or freelance work.' },

  // Global public portfolio switch. This is intentionally independent
  // from the visibility of individual profile fields.
  portfolioVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('profile', profileSchema);
