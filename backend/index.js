// index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Pass database connection to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running 🏃‍♂️');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
