const express = require('express');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
const port = 3000;

// Middleware to parse raw text
app.use(express.text()); // Use `express.text()` middleware to handle raw text

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://manish9211:MaNiSh9211@cluster9211.be3bfds.mongodb.net/vs-hack')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Schema for Questions
const questionSchema = new mongoose.Schema({
    questionName: String,  // This will be used to store the question number (e.g., "question-1")
    answer: String // This stores the answer content
});

// Create the Model for the "questions" collection
const Question = mongoose.model('questions', questionSchema);

// Define the secret key that is required in the POST request query string
const SECRET_KEY = 'manish1217';

// Endpoint to post a question to the database
app.post('/add-question', async (req, res) => {
    try {
        const questionName = req.query.question; // Extract questionName from query string
        const key = req.query.key; // Extract key from query string
        const answerContent = req.body; // Extract large answer (code) from the request body

        // Check for the key in the query string
        if (!key || key !== SECRET_KEY) {
            return res.status(403).send('Invalid or missing key');
        }

        // Ensure questionName and answer content are provided
        if (!questionName) {
            return res.status(400).send('Question name is required in the query string');
        }

        if (!answerContent) {
            return res.status(400).send('Answer content is required in the request body');
        }

        // Find the question by questionName and update it or create a new one
        const updatedQuestion = await Question.findOneAndUpdate(
            { questionName }, // Filter to find the document
            { answer: answerContent }, // Update the document
            { new: true, upsert: true } // Return the new document and create if not found
        );

        res.status(201).send('Answer (code) stored successfully');
    } catch (error) {
        res.status(500).send('Failed to store the answer');
    }
});

// Endpoint to retrieve an answer by question number (GET)
app.get('/:question', async (req, res) => {
    try {
        const questionParam = req.params.question; // e.g., question-1
        const question = await Question.findOne({ questionName: questionParam });

        if (!question) {
            return res.status(404).send('Question not found');
        }

        res.send(`Answer retrieved successfully: ${question.answer}`);
    } catch (error) {
        res.status(500).send('Failed to retrieve the answer');
    }
});

// Default endpoint to retrieve all documents in the collection (GET)
app.get('/', async (req, res) => {
    try {
        const allQuestions = await Question.find();
        let responseText = 'All answers retrieved:\n';
        allQuestions.forEach(q => {
            responseText += `Question Name: ${q.questionName}\nAnswer: ${q.answer}\n\n`;
        });
        res.send(responseText);
    } catch (error) {
        res.status(500).send('Failed to retrieve all answers');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
