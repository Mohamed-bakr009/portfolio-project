const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "uplodes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|svg/;
  const ok = allowed.test(path.extname(file.originalname).toLowerCase());
  if (ok) return cb(null, true);
  cb(new Error("Only image files (jpg, jpeg, png, webp, svg) are allowed"));
};

const pdfFileFilter = (req, file, cb) => {
  const ok = path.extname(file.originalname).toLowerCase() === ".pdf";
  if (ok) return cb(null, true);
  cb(new Error("Only PDF files are allowed"));
};

const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadPdf = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = { uploadImage, uploadPdf };
