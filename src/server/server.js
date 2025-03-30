import express, { json } from 'express';
import dotenv from 'dotenv';
import aiHandler from './routes/AIHandler.js';
import process from 'process';

dotenv.config();
const app = express();

// app.use(express.json());
app.use(json());
app.use('/api', aiHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});