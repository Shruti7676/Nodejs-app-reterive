const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(`mongodb+srv://shruti:Super1234@nodejs.kbmcrhy.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Compass');
});

// Define a simple schema
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    name: String,
    email: String,
    age:Number
});

const DataModel = mongoose.model('user', dataSchema);

app.use(bodyParser.json());

app.get('/api/get-data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
