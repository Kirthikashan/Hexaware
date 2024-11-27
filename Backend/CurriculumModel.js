import mongoose from 'mongoose';

const CurriculumSchema = new mongoose.Schema({
  topic: String,
  subtopic: String,
  questionsGenerated: { type: Number, default: 0 },
});

const Curriculum = mongoose.model('Curriculum', CurriculumSchema);
export default Curriculum; // Ensure this is exporting correctly
