// models/UploadedFile.js
import mongoose from 'mongoose';

const UploadedFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const UploadedFile = mongoose.model('UploadedFile', UploadedFileSchema);

export default UploadedFile;