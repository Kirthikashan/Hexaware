import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import Curriculum from '../models/CurriculumModel.js'; // Adjust the path based on your file structure
import QuestionBank from '../models/QuestionBank.js'; // Ensure the path includes the .js extension


const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Directory for storing uploaded files

// Endpoint to upload curriculum
router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  // Parse the uploaded Excel or CSV file
  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const curriculumData = xlsx.utils.sheet_to_json(worksheet);
  
  // Save curriculum data to the database
  try {
    await Curriculum.insertMany(curriculumData);
    res.json({ message: 'Curriculum uploaded successfully', curriculumData });
  } catch (error) {
    res.status(500).json({ message: 'Error saving curriculum.', error: error.message });
  }
});

// Endpoint to fetch curriculum mapping
router.get('/mapping', async (req, res) => {
  try {
    const curriculumTopics = await Curriculum.find();
    const questionBank = await QuestionBank.find(); // Ensure questions are tagged with topics

    const mapping = curriculumTopics.map(topic => {
      const questionsForTopic = questionBank.filter(q => q.topic === topic.topic);
      return {
        topic: topic.topic,
        subtopic: topic.subtopic,
        questionsGenerated: questionsForTopic.length
      };
    });

    res.json({ mapping });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching curriculum mapping.', error: error.message });
  }
});

// Export the router
export default router;
