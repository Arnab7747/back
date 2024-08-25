const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

const userId = "john_doe_17091999"; 
const email = "john@xyz.com";
const rollNumber = "ABCD123";

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate the request body
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: userId,
                email,
                roll_number: rollNumber,
                numbers: [],
                alphabets: [],
                highest_lowercase_alphabet: [],
                message: "'data' should be an array."
            });
        }

        const numbers = [];
        const alphabets = [];
        let highestLowercase = '';

        data.forEach(item => {
            if (typeof item === 'string' && !isNaN(item)) {
                // Convert numeric strings to numbers
                numbers.push(item);
            } else if (typeof item === 'string') {
                alphabets.push(item);
                if (item >= 'a' && item <= 'z' && item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        });

        res.json({
            is_success: true,
            user_id: userId,
            email,
            roll_number: rollNumber,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            user_id: userId,
            email,
            roll_number: rollNumber,
            numbers: [],
            alphabets: [],
            highest_lowercase_alphabet: [],
            message: "An error occurred while processing the request.",
            error: error.message // Include error message in the response
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
