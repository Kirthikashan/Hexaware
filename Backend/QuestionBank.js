import mongoose from 'mongoose';

const QuestionBankSchema = new mongoose.Schema({
  topic: String,
  difficulty: String,
  question: String,
  options: [String],
  answer: String
});

const QuestionBank = mongoose.model('QuestionBank', QuestionBankSchema);
export default QuestionBank; // Make sure this line is included
