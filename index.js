const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userId = "john_doe_17091999";  // Replace with the actual full_name_ddmmyyyy
const email = "john@xyz.com";
const rollNumber = "ABCD123";

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: userId,
                email,
                roll_number: rollNumber,
                numbers: [],
                alphabets: [],
                highest_lowercase_alphabet: [],
                message: "Invalid input format. 'data' should be an array."
            });
        }

        const numbers = [];
        const alphabets = [];
        let highestLowercase = '';

        data.forEach(item => {
            if (!isNaN(item)) {
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
        res.status(500).json({
            is_success: false,
            message: "An error occurred while processing the request."
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
